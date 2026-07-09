# Premium Typeform-Style Enquiry System

A production-ready, highly interactive Typeform-style enquiry system built with **pure HTML5, CSS3, and Vanilla JavaScript** on the front-end, integrated with **Google Sheets & Google Apps Script** on the back-end.

This system is custom-designed for **Om Shringar Tirpal Store** to capture high-intent wholesale and retail inquiries for Tarpaulins, Plastic Sheets, Silpaulins, and other waterproof coverings.

---

## Features

- **Typeform-Style UX**: One question at a time with smooth sliding transitions.
- **Glassmorphic & Fluid Design**: Inspired by Apple and Stripe design languages. Uses custom gradient accents, modern typography, floating labels, and fluid micro-interactions.
- **Auto-Save & Resume**: Progress is saved automatically in `localStorage`. If a user refreshes or returns later, they can resume where they left off.
- **Comprehensive Validation**: Includes real-time validation for Indian mobile numbers (10 digits starting with 6-9) and PIN codes (6 digits). Animated inline errors prevent skipping required questions.
- **Owner Alerts & Customer Auto-Reply**: Sends structured HTML emails to the store owner with enquiry details, and auto-sends a professional greeting confirmation email to the customer.
- **Spam Protection**: Equipped with a hidden honeypot field and dynamic CSRF-like submission checks to block automated spam bots.
- **Confetti Celebration**: Displays a celebratory confetti shower upon successful submission using `canvas-confetti`.
- **Auto-Redirect**: Automatically counts down and redirects the user back to the primary website `https://www.shridantahub.in` after exactly 3 seconds.

---

## File Structure

```text
enquiry-system/
├── index.html            # Main markup with responsive, accessible structure
├── style.css             # Apple/Stripe-inspired glassmorphism styles (Dark & Light modes)
├── script.js             # Vanilla JS Typeform controller, validations, and effects
├── Code.gs               # Google Apps Script (Backend Sheet integration & Mailers)
└── README.md             # This guide
```

---

## Deployment Instructions

### Step 1: Set Up the Google Sheet
1. Open [Google Sheets](https://sheets.google.com).
2. Create a **Blank Spreadsheet** and name it `Om Shringar Tirpal Store Enquiries`.
3. Rename the first tab/sheet from `Sheet1` to `Enquiries`.
4. Add the following header row in **Row 1** (columns A to S):
   - **A1**: `Submission ID`
   - **B1**: `Submission Date`
   - **C1**: `Submission Time`
   - **D1**: `Customer Name`
   - **E1**: `Mobile Number`
   - **F1**: `WhatsApp Number`
   - **G1**: `Product Interested In`
   - **H1**: `Required Size`
   - **I1**: `Quantity`
   - **J1**: `Purpose`
   - **K1**: `Village / City`
   - **L1**: `PIN Code`
   - **M1**: `Full Address`
   - **N1**: `Additional Requirement`
   - **O1**: `User Agent`
   - **P1**: `Browser`
   - **Q1**: `Device Type`
   - **R1**: `Referrer`
   - **S1**: `Status` (Optional, for your internal tracking, e.g. "Pending")
5. Copy the **Spreadsheet ID** from the URL bar. The ID is the long string of letters and numbers between `/d/` and `/edit` in your browser address bar:
   `https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID_HERE/edit`

### Step 2: Deploy Google Apps Script
1. In your Google Sheet, click on **Extensions** in the top menu, then select **Apps Script**.
2. Delete any existing code in the editor and paste the full contents of `Code.gs`.
3. Update the following configuration constants at the top of the script:
   - `SPREADSHEET_ID`: Paste your copied Spreadsheet ID here.
   - `OWNER_EMAIL`: The email address where you want to receive new enquiry alerts (e.g., your business email).
4. Click the **Save** icon (floppy disk) or press `Ctrl + S` (`Cmd + S` on Mac).
5. Name the Apps Script project `Om Shringar Enquiry Backend`.

### Step 3: Deploy as a Web App
1. In the top-right corner of the Apps Script interface, click **Deploy** > **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in the deployment details:
   - **Description**: `Om Shringar Premium Enquiry Form API`
   - **Execute as**: `Me (your-email@gmail.com)` (This is critical: it allows the public form to submit data to your sheet under your Google credentials).
   - **Who has access**: `Anyone` (Necessary so your website visitors can submit the form).
4. Click **Deploy**.
5. If prompted, click **Authorize access**, select your Google account, click **Advanced** (under safety warnings), and click **Go to Om Shringar Enquiry Backend (unsafe)** to grant permissions for sending emails and editing sheets.
6. Copy the **Web App URL** provided under the deployment details (it ends in `/exec`).

### Step 4: Update Your Front-End Code
1. Open the `script.js` file from this package.
2. Find the `CONFIG` constant at the very top:
   ```javascript
   const CONFIG = {
     googleAppsScriptUrl: "PASTE_YOUR_WEB_APP_URL_HERE"
   };
   ```
3. Paste your copied Google Apps Script Web App URL between the quotes.
4. Save the file.

---

## Customizing and Styling

- **Accents & Colors**: The theme relies on warm orange/amber gradients (`#ea580c` to `#f59e0b`) representing the core brand elements of Om Shringar Tirpal Store.
- **Glassmorphism**: Adjust the glass background blur or transparency in `style.css` under the `.glass-card` selector.
- **Honeypot Protection**: The field named `website_verify` is a hidden honeypot. It is invisible to real users but standard spam bots will autofill it. The script automatically rejects submissions if this field contains any value.

---

## Technical Support & License
Designed specifically for **Om Shringar Tirpal Store**. For updates or technical assistance, contact the Webmaster.
