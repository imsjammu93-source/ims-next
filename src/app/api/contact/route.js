import nodemailer from "nodemailer";
import crypto from "crypto";

// Separate in-memory caches to prevent human duplicate spam and replay attacks for Contact inquiries
const usedContactSignatures = new Map(); // signature -> timestamp
const contactSubmissionCache = new Map(); // phone/email -> timestamp

const COOLDOWN_DURATION = 5 * 60 * 1000; // 5 minutes duplicate submission cooldown
const CAPTCHA_EXPIRATION = 10 * 60 * 1000; // 10 minutes captcha validation window

function cleanupCaches() {
  const now = Date.now();
  
  // Clean up used signatures older than 10 minutes
  for (const [sig, ts] of usedContactSignatures.entries()) {
    if (now - ts > CAPTCHA_EXPIRATION) {
      usedContactSignatures.delete(sig);
    }
  }

  // Clean up duplicate submission cooldowns older than 5 minutes
  for (const [key, ts] of contactSubmissionCache.entries()) {
    if (now - ts > COOLDOWN_DURATION) {
      contactSubmissionCache.delete(key);
    }
  }
}

export async function GET(req) {
  try {
    cleanupCaches();

    const num1 = Math.floor(Math.random() * 9) + 1; // 1 to 9
    const num2 = Math.floor(Math.random() * 9) + 1; // 1 to 9
    const timestamp = Date.now();
    const secret = process.env.JWT_SECRET || "ims-captcha-secret-key-2024";

    const signature = crypto
      .createHmac("sha256", secret)
      .update(`${num1}+${num2}+${timestamp}`)
      .digest("hex");

    return Response.json({
      success: true,
      num1,
      num2,
      timestamp,
      signature
    });
  } catch (error) {
    console.error("Error generating contact captcha:", error);
    return Response.json(
      { success: false, message: "Failed to generate security verification" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    cleanupCaches();

    const body = await req.json();
    const { name, email, phone, subject, message, num1, num2, timestamp, signature, captchaAnswer } = body;

    // 1. Captcha validation
    if (!signature || captchaAnswer === undefined || num1 === undefined || num2 === undefined || !timestamp) {
      return Response.json(
        { success: false, message: "Security validation is missing. Please solve the captcha." },
        { status: 400 }
      );
    }

    // 2. Prevent Replay Attack
    if (usedContactSignatures.has(signature)) {
      return Response.json(
        { success: false, message: "This security challenge has already been solved. Please load a fresh captcha." },
        { status: 400 }
      );
    }

    // 3. Verify Challenge Age (10 minutes max)
    const now = Date.now();
    const challengeTime = parseInt(timestamp, 10);
    if (isNaN(challengeTime) || now - challengeTime > CAPTCHA_EXPIRATION) {
      return Response.json(
        { success: false, message: "Security challenge expired. Please click refresh next to the captcha." },
        { status: 400 }
      );
    }

    const secret = process.env.JWT_SECRET || "ims-captcha-secret-key-2024";
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${num1}+${num2}+${timestamp}`)
      .digest("hex");

    if (signature !== expectedSignature) {
      return Response.json(
        { success: false, message: "Security challenge signature is invalid. Please refresh the captcha." },
        { status: 400 }
      );
    }

    if (parseInt(captchaAnswer, 10) !== parseInt(num1, 10) + parseInt(num2, 10)) {
      return Response.json(
        { success: false, message: "Incorrect math answer. Please try again." },
        { status: 400 }
      );
    }

    // 4. Submission Cooldown / Cooldown Rate Limiting (by Phone & Email)
    const normPhone = phone ? phone.trim() : null;
    const normEmail = email ? email.trim().toLowerCase() : null;

    if (normPhone && contactSubmissionCache.has(normPhone)) {
      const lastSub = contactSubmissionCache.get(normPhone);
      if (now - lastSub < COOLDOWN_DURATION) {
        return Response.json(
          { success: false, message: "An inquiry with this phone number was recently submitted. Please wait a few minutes." },
          { status: 429 }
        );
      }
    }

    if (normEmail && contactSubmissionCache.has(normEmail)) {
      const lastSub = contactSubmissionCache.get(normEmail);
      if (now - lastSub < COOLDOWN_DURATION) {
        return Response.json(
          { success: false, message: "An inquiry with this email address was recently submitted. Please wait a few minutes." },
          { status: 429 }
        );
      }
    }

    // 5. Save to Database via PHP API
    try {
        let apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/contact_messages/add.php`;
        // Ensure IPv4 resolution for local Node.js server-side fetch
        apiUrl = apiUrl.replace('localhost', '127.0.0.1');
        
        console.log("Targeting PHP API at:", apiUrl);
        
        // Pass original formData fields to the DB PHP API
        const dbPayload = { name, email, phone, subject, message };
        const dbRes = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dbPayload)
        });
        const dbData = await dbRes.json();
        console.log("PHP API Response:", dbData);
        if (!dbData.success) {
            console.error("DB Save Failed:", dbData.message);
        }
    } catch (dbErr) {
        console.error("DB Connection Error:", dbErr.message);
    }

    // 6. Send Email Notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `New Inquiry: ${subject || 'Contact from Website'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
          <h2 style="color: #1e293b; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">New Student Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
          <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-top: 15px;">
            <strong>Message:</strong><br/>
            ${message ? message.replace(/\n/g, '<br/>') : ''}
          </div>
          <p style="font-size: 0.8rem; color: #64748b; margin-top: 20px;">This message was sent from the IMS Jammu official contact form.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    // 7. Success state caching
    usedContactSignatures.set(signature, challengeTime);
    if (normPhone) contactSubmissionCache.set(normPhone, now);
    if (normEmail) contactSubmissionCache.set(normEmail, now);

    return Response.json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Failed to send message",
      },
      { status: 500 }
    );
  }
}

