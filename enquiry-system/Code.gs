/**
 * ==============================================================================
 * Om Shringar Tirpal Store - Premium Enquiry Backend
 * ==============================================================================
 * File: Code.gs
 * Description: Google Apps Script Web App Endpoint.
 * Saves enquiry entries to Google Sheets, handles CORS, and delivers 
 * beautiful HTML emails to both the business owner and the customer.
 * 
 * Instructions:
 * 1. Replace SPREADSHEET_ID and OWNER_EMAIL with your spreadsheet and email info.
 * 2. Save and Deploy as a Web App: Execute as "Me", Access: "Anyone".
 * ==============================================================================
 */

// CONFIGURATION CONSTANTS
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // Replace with your actual Google Sheet ID
const SHEET_NAME = 'Enquiries';
const OWNER_EMAIL = 'shridanta.official@gmail.com'; // Owner email for receiving instant alerts
const OWNER_NAME = 'Vinod Kumar (Om Shringar)';

/**
 * Handle POST Requests from Front-end
 * @param {Object} e HTTP POST Request event object
 * @return {TextOutput} JSON Response with CORS Headers
 */
function doPost(e) {
  try {
    // 1. Parse payload parameters
    var params;
    if (e.postData && e.postData.contents) {
      params = JSON.parse(e.postData.contents);
    } else {
      params = e.parameter;
    }

    // 2. Anti-spam Honeypot Check
    // If the hidden website_verify field is filled, silently reject as spam
    if (params.website_verify && params.website_verify.trim() !== "") {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Spam detected.'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // 3. Connect to target Spreadsheet
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      // Create the sheet if it doesn't exist
      sheet = ss.insertSheet(SHEET_NAME);
      var headers = [
        "Submission ID", "Submission Date", "Submission Time", 
        "Customer Name", "Mobile Number", "WhatsApp Number", 
        "Product Interested In", "Required Size", "Quantity", 
        "Purpose", "Village / City", "PIN Code", "Full Address", 
        "Additional Requirement", "User Agent", "Browser", 
        "Device Type", "Referrer", "Status"
      ];
      sheet.appendRow(headers);
      // Format headers
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#ea580c").setFontColor("#white");
    }

    // 4. Generate metadata
    var now = new Date();
    var submissionId = 'OS-' + Math.floor(100000 + Math.random() * 900000);
    
    // Formatting date and time
    var dateString = Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyy-MM-dd");
    var timeString = Utilities.formatDate(now, Session.getScriptTimeZone(), "HH:mm:ss");

    // 5. Build row array
    var rowData = [
      submissionId,
      dateString,
      timeString,
      params.customerName || "",
      "'" + (params.mobileNumber || ""), // Prefix with ' to treat as text in Sheets
      params.whatsAppNumber ? "'" + params.whatsAppNumber : "",
      params.productInterested || "",
      params.requiredSize || "",
      params.quantity || "",
      params.purpose || "",
      params.villageCity || "",
      params.pinCode ? "'" + params.pinCode : "",
      params.fullAddress || "",
      params.additionalRequirement || "",
      params.userAgent || "",
      params.browserName || "",
      params.deviceType || "",
      params.referrerUrl || "",
      "Pending"
    ];

    // 6. Append to spreadsheet
    sheet.appendRow(rowData);

    // 7. Send Emails (Owner Notification & Customer Confirmation)
    sendOwnerEmail(params, submissionId, dateString, timeString);
    if (params.customerEmail && params.customerName) {
      sendCustomerEmail(params, submissionId);
    }

    // 8. Return success
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      submissionId: submissionId
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
    });

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
    });
  }
}

/**
 * Handle HTTP OPTIONS requests for CORS Preflight checks
 */
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    });
}

/**
 * Handle GET Requests (For testing/verification)
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "active",
    message: "Om Shringar Tirpal Store Enquiry Endpoint is running successfully."
  }))
  .setMimeType(ContentService.MimeType.JSON)
  .setHeaders({
    'Access-Control-Allow-Origin': '*'
  });
}

/**
 * Sends a beautiful HTML notification email to the owner
 */
function sendOwnerEmail(data, submissionId, dateStr, timeStr) {
  var subject = "📩 New Website Enquiry - " + (data.customerName || "Valued Customer");
  
  var htmlBody = `
    <div style="background-color: #f8fafc; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
        <!-- Header Banner -->
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e40af 100%); padding: 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">New Website Enquiry</h1>
          <p style="color: rgba(255, 255, 255, 0.85); margin: 8px 0 0 0; font-size: 14px; font-weight: 500;">ID: ${submissionId} &bull; Date: ${dateStr} at ${timeStr}</p>
        </div>
        
        <!-- Customer Profile Card -->
        <div style="padding: 30px;">
          <h2 style="font-size: 18px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 20px; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">👤 Customer Details</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-weight: 600; width: 40%; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Name</td>
              <td style="padding: 10px 0; color: #0f172a; font-weight: 700; font-size: 15px;">${data.customerName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Mobile Number</td>
              <td style="padding: 10px 0; color: #0f172a; font-weight: 700; font-size: 15px;">
                <a href="tel:${data.mobileNumber}" style="color: #1e40af; text-decoration: none;">${data.mobileNumber}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Email Address</td>
              <td style="padding: 10px 0; color: #0f172a; font-weight: 700; font-size: 15px;">
                <a href="mailto:${data.customerEmail}" style="color: #1e40af; text-decoration: none;">${data.customerEmail}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">State</td>
              <td style="padding: 10px 0; color: #0f172a; font-weight: 700; font-size: 15px;">${data.state || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">District</td>
              <td style="padding: 10px 0; color: #0f172a; font-weight: 700; font-size: 15px;">${data.district || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">City / Town / Village</td>
              <td style="padding: 10px 0; color: #0f172a; font-weight: 600; font-size: 15px;">${data.villageCity || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">PIN Code</td>
              <td style="padding: 10px 0; color: #0f172a; font-mono; font-weight: 700; font-size: 15px;">${data.pinCode || "N/A"}</td>
            </tr>
          </table>

          <!-- Metadata -->
          <div style="background-color: #f8fafc; border-radius: 8px; padding: 15px; border: 1px dashed #cbd5e1; font-size: 11px; color: #64748b; line-height: 1.4;">
            <strong>System Meta-Logs:</strong><br>
            Device Type: ${data.deviceType || 'Unknown'}<br>
            Referrer: ${data.referrerUrl || 'Direct'}<br>
            Agent: ${data.userAgent || 'Unknown'}
          </div>

          <!-- Quick Action Button -->
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://wa.me/91${data.whatsAppNumber || data.mobileNumber}?text=Namaste%20${encodeURIComponent(data.customerName)},%20thank%20you%20for%20contacting%20Om%20Shringar%20Tirpal%20Store..." 
               style="background-color: #10b981; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px; display: inline-block; box-shadow: 0 4px 6px rgba(16,185,129,0.2);">
               💬 Connect via WhatsApp
            </a>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #0f172a; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8;">
          © ${new Date().getFullYear()} Om Shringar Tirpal Store. All rights reserved.
        </div>
      </div>
    </div>
  `;

  MailApp.sendEmail({
    to: OWNER_EMAIL,
    subject: subject,
    htmlBody: htmlBody
  });
}

/**
 * Sends a beautiful HTML receipt / confirmation email to the customer
 */
function sendCustomerEmail(data, submissionId) {
  var customerEmail = data.customerEmail;
  var customerName = data.customerName;
  var subject = "Thank you for contacting Om Shringar Tirpal Store";
  
  var htmlBody = `
    <div style="background-color: #f8fafc; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
        <!-- Header Banner -->
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e40af 100%); padding: 35px 30px; text-align: center;">
          <div style="width: 50px; height: 50px; background-color: #ea580c; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; color: #ffffff; font-weight: 800; font-size: 20px; margin-bottom: 15px; box-shadow: 0 4px 10px rgba(234,88,12,0.3);">OS</div>
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">Enquiry Received Successfully</h1>
          <p style="color: #94a3b8; margin: 6px 0 0 0; font-size: 13px;">Reference ID: #${submissionId}</p>
        </div>
        
        <!-- Content Area -->
        <div style="padding: 30px;">
          <p style="color: #1e293b; font-size: 15px; margin-top: 0;">Dear ${customerName},</p>
          
          <p style="color: #475569; font-size: 15px;">
            Thank you for submitting your enquiry.
          </p>
          
          <p style="color: #475569; font-size: 15px;">
            We have received your request successfully and our team will contact you shortly with the best quotation.
          </p>
          
          <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; margin: 25px 0;">
            <h3 style="margin-top: 0; margin-bottom: 15px; font-size: 14px; color: #0f172a; font-weight: 700; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Submitted Details:</h3>
            <ul style="list-style-type: none; padding: 0; margin: 0; font-size: 14px; color: #334155;">
              <li style="padding: 4px 0;"><strong>• Name:</strong> ${customerName}</li>
              <li style="padding: 4px 0;"><strong>• Mobile Number:</strong> ${data.mobileNumber}</li>
              <li style="padding: 4px 0;"><strong>• Email:</strong> ${customerEmail}</li>
              <li style="padding: 4px 0;"><strong>• State:</strong> ${data.state || 'N/A'}</li>
              <li style="padding: 4px 0;"><strong>• District:</strong> ${data.district || 'N/A'}</li>
              <li style="padding: 4px 0;"><strong>• City:</strong> ${data.villageCity || 'N/A'}</li>
              <li style="padding: 4px 0;"><strong>• PIN Code:</strong> ${data.pinCode || 'N/A'}</li>
            </ul>
          </div>

          <div style="background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 15px; border-radius: 8px; margin-bottom: 25px; font-size: 14px; color: #14532d;">
            <strong>If you need immediate assistance, contact us:</strong><br>
            📞 9852076197<br>
            🌐 <a href="http://www.shridantahub.in" style="color: #ea580c; text-decoration: none; font-weight: bold;">www.shridantahub.in</a>
          </div>

          <p style="font-size: 14px; color: #475569; text-align: center;">
            We'd appreciate your feedback after your experience:<br>
            <a href="https://g.page/r/CcNkBnhh_d2nEAE/review" target="_blank" style="color: #ea580c; text-decoration: underline; font-weight: bold;">Leave a Google Review</a>
          </p>

          <p style="margin-top: 30px; font-size: 14px; color: #475569;">
            Regards,<br>
            <strong>Om Shringar Tirpal Store</strong>
          </p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #ea580c; padding: 20px; text-align: center; font-size: 12px; color: #ffffff;">
          <strong>Om Shringar Tirpal Store</strong><br>
          Premium Tarpaulin, Plastic Sheets, and Waterproof covers.
        </div>
      </div>
    </div>
  `;

  MailApp.sendEmail({
    to: customerEmail,
    subject: subject,
    htmlBody: htmlBody
  });
}
