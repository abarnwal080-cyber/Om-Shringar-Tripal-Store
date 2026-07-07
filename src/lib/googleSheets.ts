import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
// Request the required scopes for Google Sheets and Google Drive
provider.addScope('https://www.googleapis.com/auth/spreadsheets');
provider.addScope('https://www.googleapis.com/auth/drive.file');

let isSigningIn = false;
let cachedAccessToken: string | null = null;

// Initialize auth state listener
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Sign in with Google Popup
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get access token from Firebase Auth');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

// Google Drive & Sheets API Operations

const SPREADSHEET_NAME = "Om Shringar Tirpal Store Enquiries";

/**
 * Searches for an existing Google Sheet by name in the user's Google Drive.
 */
async function findSpreadsheet(accessToken: string): Promise<string | null> {
  try {
    const q = encodeURIComponent(`name = '${SPREADSHEET_NAME}' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false`);
    const res = await fetch(`https://www.googleapis.com/drive/v3/files?q=${q}&spaces=drive`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) {
      console.error("Failed to query Google Drive API:", await res.text());
      return null;
    }
    const data = await res.json();
    if (data.files && data.files.length > 0) {
      return data.files[0].id;
    }
    return null;
  } catch (error) {
    console.error("Error finding spreadsheet:", error);
    return null;
  }
}

/**
 * Creates a brand new Google Sheet in the user's Google Drive and adds headers.
 */
async function createSpreadsheet(accessToken: string): Promise<string | null> {
  try {
    const res = await fetch("https://sheets.googleapis.com/v4/spreadsheets", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: {
          title: SPREADSHEET_NAME,
        },
      }),
    });
    if (!res.ok) {
      console.error("Failed to create spreadsheet:", await res.text());
      return null;
    }
    const data = await res.json();
    const spreadsheetId = data.spreadsheetId;

    if (spreadsheetId) {
      // Add standard headers
      const headers = [["Timestamp", "Name", "Phone", "Product", "Size", "Type", "Message"]];
      await appendRow(spreadsheetId, headers, accessToken);
      return spreadsheetId;
    }
    return null;
  } catch (error) {
    console.error("Error creating spreadsheet:", error);
    return null;
  }
}

/**
 * Appends a row of values to a specific spreadsheet.
 */
async function appendRow(spreadsheetId: string, values: any[][], accessToken: string): Promise<boolean> {
  try {
    const range = "Sheet1!A1";
    const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values,
      }),
    });
    if (!res.ok) {
      console.error("Failed to append row:", await res.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error appending row:", error);
    return false;
  }
}

export interface EnquiryData {
  name: string;
  phone: string;
  product: string;
  size: string;
  type: string;
  message: string;
}

/**
 * Main entry point to log an enquiry to Google Sheets.
 * Find or creates the sheet, then appends the data.
 */
export async function logEnquiryToSheet(enquiry: EnquiryData, accessToken: string): Promise<{ success: boolean; spreadsheetUrl?: string }> {
  let spreadsheetId = localStorage.getItem("enquiries_spreadsheet_id");
  
  if (spreadsheetId) {
    // Check if it's still accessible
    const checkRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=spreadsheetId`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!checkRes.ok) {
      spreadsheetId = null;
      localStorage.removeItem("enquiries_spreadsheet_id");
    }
  }

  if (!spreadsheetId) {
    spreadsheetId = await findSpreadsheet(accessToken);
  }

  if (!spreadsheetId) {
    spreadsheetId = await createSpreadsheet(accessToken);
  }

  if (spreadsheetId) {
    localStorage.setItem("enquiries_spreadsheet_id", spreadsheetId);
    
    const row = [
      [
        new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        enquiry.name,
        enquiry.phone,
        enquiry.product || "General Inquiry",
        enquiry.size || "Not specified",
        enquiry.type,
        enquiry.message || "No special requirements.",
      ]
    ];
    
    const success = await appendRow(spreadsheetId, row, accessToken);
    return {
      success,
      spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}`,
    };
  }

  return { success: false };
}
