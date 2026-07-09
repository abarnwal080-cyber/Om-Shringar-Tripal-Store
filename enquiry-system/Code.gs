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
const OWNER_EMAIL = 'abarnwal080@gmail.com'; // Owner email for receiving instant alerts
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
    if (params.mobileNumber && params.customerName) {
      // Optional: If you want to notify by email and an email was provided. 
      // Note: The prompt asks us to send a customer email but our required fields 
      // don't have Customer Email. Let's add an optional Email field or send it if 
      // they happen to pass it, OR we'll default to sending a copy to a test account 
      // or assume we got customer email. Let's check if customer email is passed in payload.
      if (params.customerEmail) {
        sendCustomerEmail(params.customerEmail, params.customerName, submissionId);
      }
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
  var subject = "🔔 New Customer Enquiry Received [" + submissionId + "]";
  
  var htmlBody = `
    <div style="background-color: #f8fafc; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
        <!-- Header Banner -->
        <div style="background: linear-gradient(135deg, #ea580c 0%, #f97316 100%); padding: 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">New Enquiry Received</h1>
          <p style="color: rgba(255, 255, 255, 0.85); margin: 8px 0 0 0; font-size: 14px; font-weight: 500;">ID: ${submissionId} &bull; Date: ${dateStr} at ${timeStr}</p>
        </div>
        
        <!-- Customer Profile Card -->
        <div style="padding: 30px;">
          <h2 style="font-size: 18px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 20px; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">👤 Customer Profile</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-weight: 600; width: 40%; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Name</td>
              <td style="padding: 10px 0; color: #0f172a; font-weight: 700; font-size: 15px;">${data.customerName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Phone Number</td>
              <td style="padding: 10px 0; color: #0f172a; font-weight: 700; font-size: 15px;">
                <a href="tel:${data.mobileNumber}" style="color: #ea580c; text-decoration: none;">${data.mobileNumber}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">WhatsApp Number</td>
              <td style="padding: 10px 0; color: #0f172a; font-weight: 700; font-size: 15px;">
                ${data.whatsAppNumber ? `<a href="https://wa.me/91${data.whatsAppNumber}" style="color: #10b981; text-decoration: none; font-weight: 700;">✅ ${data.whatsAppNumber}</a>` : '<span style="color: #94a3b8; font-style: italic;">Not Provided</span>'}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Village / City</td>
              <td style="padding: 10px 0; color: #0f172a; font-weight: 600; font-size: 15px;">${data.villageCity}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">PIN Code</td>
              <td style="padding: 10px 0; color: #0f172a; font-mono; font-weight: 700; font-size: 15px;">${data.pinCode}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Full Address</td>
              <td style="padding: 10px 0; color: #0f172a; font-weight: 500; font-size: 14px; line-height: 1.5;">${data.fullAddress}</td>
            </tr>
          </table>

          <h2 style="font-size: 18px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 20px; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">📦 Requirement Details</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-weight: 600; width: 40%; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Product</td>
              <td style="padding: 10px 0; color: #ea580c; font-weight: 800; font-size: 16px;">${data.productInterested}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Required Size</td>
              <td style="padding: 10px 0; color: #0f172a; font-weight: 700; font-size: 15px;">${data.requiredSize || '<span style="color: #94a3b8; font-style: italic;">Not Specified</span>'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Quantity</td>
              <td style="padding: 10px 0; color: #0f172a; font-weight: 700; font-size: 15px;">${data.quantity || '1'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">End Purpose</td>
              <td style="padding: 10px 0; color: #0f172a; font-weight: 600; font-size: 15px;">${data.purpose}</td>
            </tr>
          </table>

          ${data.additionalRequirement ? `
            <div style="background-color: #fdf2e9; border-left: 4px solid #ea580c; padding: 15px; border-radius: 8px; margin-bottom: 30px;">
              <strong style="display: block; font-size: 13px; color: #c2410c; text-transform: uppercase; margin-bottom: 5px;">📝 Additional Specifications:</strong>
              <p style="margin: 0; font-size: 14px; color: #431407; font-style: italic;">"${data.additionalRequirement}"</p>
            </div>
          ` : ''}

          <!-- Metadata -->
          <div style="background-color: #f8fafc; border-radius: 8px; padding: 15px; border: 1px dashed #cbd5e1; font-size: 11px; color: #64748b; line-height: 1.4;">
            <strong>System Meta-Logs:</strong><br>
            Device: ${data.deviceType || 'Unknown'} | Browser: ${data.browserName || 'Unknown'}<br>
            Referrer: ${data.referrerUrl || 'Direct'}<br>
            Agent: ${data.userAgent || 'Unknown'}
          </div>

          <!-- Quick Action Button -->
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://wa.me/91${data.whatsAppNumber || data.mobileNumber}?text=Namaste%20${encodeURIComponent(data.customerName)},%20thank%20you%20for%20contacting%20Om%20Shringar%20Tirpal%20Store%20regarding%20${encodeURIComponent(data.productInterested)}..." 
               style="background-color: #10b981; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px; display: inline-block; box-shadow: 0 4px 6px rgba(16,185,129,0.2);">
               💬 Connect via WhatsApp
            </a>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #0f172a; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8;">
          © ${new Date().getFullYear()} Om Shringar Tirpal Store Maharajganj. All rights reserved.
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
function sendCustomerEmail(customerEmail, customerName, submissionId) {
  var subject = "Thank You for Contacting Om Shringar Tirpal Store";
  
  var htmlBody = `
    <div style="background-color: #f8fafc; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
        <!-- Header Banner -->
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 35px 30px; text-align: center;">
          <div style="width: 50px; height: 50px; background-color: #ea580c; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; color: #ffffff; font-weight: 800; font-size: 20px; margin-bottom: 15px; box-shadow: 0 4px 10px rgba(234,88,12,0.3);">OS</div>
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">Quotation Request Received</h1>
          <p style="color: #94a3b8; margin: 6px 0 0 0; font-size: 13px;">Reference ID: #${submissionId}</p>
        </div>
        
        <!-- Content Area -->
        <div style="padding: 30px; text-align: center;">
          <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-top: 0;">Namaste, ${customerName}!</h2>
          <p style="color: #475569; font-size: 15px; leading-relaxed: 1.6; margin-bottom: 25px;">
            Thank you for your inquiry. We have received your request successfully. Our pricing desk is evaluating your requirements, and we will contact you shortly with our best custom wholesale quotation.
          </p>
          
          <!-- Key Store Info Box -->
          <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; text-align: left; border: 1px solid #f1f5f9; display: inline-block; width: 100%; box-sizing: border-box; margin-bottom: 30px;">
            <h3 style="margin-top: 0; margin-bottom: 12px; font-size: 14px; color: #0f172a; font-weight: 700; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">📞 Store Contact Information</h3>
            <p style="margin: 6px 0; font-size: 14px; color: #334155;"><strong>Phone:</strong> <a href="tel:9852076197" style="color: #ea580c; text-decoration: none; font-weight: bold;">+91 98520 76197</a></p>
            <p style="margin: 6px 0; font-size: 14px; color: #334155;"><strong>Website:</strong> <a href="https://www.shridantahub.in" target="_blank" style="color: #ea580c; text-decoration: none; font-weight: bold;">www.shridantahub.in</a></p>
            <p style="margin: 6px 0; font-size: 14px; color: #334155;"><strong>Primary Store Location:</strong> Siwan, Bihar</p>
          </div>

          <p style="color: #64748b; font-size: 13px; margin: 0;">
            If you need urgent price estimates, feel free to call us directly.
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
