import nodemailer from "nodemailer";
import crypto from "crypto";

// Simple in-memory caches to prevent human duplicate spam and replay attacks
const usedSignatures = new Map(); // signature -> timestamp
const submissionCache = new Map(); // phone/email -> timestamp

const COOLDOWN_DURATION = 5 * 60 * 1000; // 5 minutes duplicate submission cooldown
const CAPTCHA_EXPIRATION = 10 * 60 * 1000; // 10 minutes captcha validation window

function cleanupCaches() {
  const now = Date.now();
  
  // Clean up used signatures older than 10 minutes
  for (const [sig, ts] of usedSignatures.entries()) {
    if (now - ts > CAPTCHA_EXPIRATION) {
      usedSignatures.delete(sig);
    }
  }

  // Clean up duplicate submission cooldowns older than 5 minutes
  for (const [key, ts] of submissionCache.entries()) {
    if (now - ts > COOLDOWN_DURATION) {
      submissionCache.delete(key);
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
    console.error("Error generating captcha:", error);
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
    const { name, email, phone, course, message, num1, num2, timestamp, signature, captchaAnswer } = body;

    // 1. Captcha validation
    if (!signature || captchaAnswer === undefined || num1 === undefined || num2 === undefined || !timestamp) {
      return Response.json(
        { success: false, message: "Security validation is missing. Please solve the captcha." },
        { status: 400 }
      );
    }

    // 2. Prevent Replay Attack
    if (usedSignatures.has(signature)) {
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

    if (normPhone && submissionCache.has(normPhone)) {
      const lastSub = submissionCache.get(normPhone);
      if (now - lastSub < COOLDOWN_DURATION) {
        return Response.json(
          { success: false, message: "An enquiry with this phone number was recently submitted. Please wait a few minutes." },
          { status: 429 }
        );
      }
    }

    if (normEmail && submissionCache.has(normEmail)) {
      const lastSub = submissionCache.get(normEmail);
      if (now - lastSub < COOLDOWN_DURATION) {
        return Response.json(
          { success: false, message: "An enquiry with this email address was recently submitted. Please wait a few minutes." },
          { status: 429 }
        );
      }
    }

    // 1. Save to Database via PHP API
    let apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/admissions/add.php`;
    // Ensure IPv4 resolution for local Node.js server-side fetch
    apiUrl = apiUrl.replace('localhost', '127.0.0.1');

    console.log("Targeting Admissions PHP API at:", apiUrl);

    const dbRes = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
   
    if (!dbRes.ok) {
      throw new Error(`PHP API responded with status: ${dbRes.status}`);
    }

    const dbData = await dbRes.json();
    if (!dbData.success) {
        throw new Error(dbData.message || "Failed to save inquiry to database");
    }

    // 2. Send Email Notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `Admission Enquiry - ${name} (${course})`,
      html: `
        <div style="background-color: #f4f7f9; padding: 40px 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border-top: 6px solid #d4a31a;">
            <div style="background: #1E355A; padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">IMS JAMMU</h1>
              <p style="color: #d4a31a; margin: 5px 0 0; font-size: 14px; font-weight: bold; text-transform: uppercase;">Admission Portal Enquiry</p>
            </div>
            <div style="padding: 40px;">
              <h2 style="color: #1E355A; margin-top: 0; font-size: 20px; border-bottom: 1px solid #eeeeee; padding-bottom: 15px;">New Student Enquiry</h2>
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr><td style="padding: 12px 0; color: #777777; font-size: 14px; width: 30%;">Student Name</td><td style="padding: 12px 0; color: #1E355A; font-weight: bold; font-size: 15px;">${name}</td></tr>
                <tr><td style="padding: 12px 0; color: #777777; font-size: 14px;">Applied Course</td><td style="padding: 12px 0; color: #d4a31a; font-weight: bold; font-size: 15px;">${course}</td></tr>
                <tr><td style="padding: 12px 0; color: #777777; font-size: 14px;">Phone Number</td><td style="padding: 12px 0; color: #1E355A; font-weight: bold; font-size: 15px;">${phone}</td></tr>
                <tr><td style="padding: 12px 0; color: #777777; font-size: 14px;">Email Address</td><td style="padding: 12px 0; color: #1E355A; font-weight: bold; font-size: 15px;">${email}</td></tr>
              </table>
              <div style="margin-top: 30px; padding: 25px; background: #fff9f9; border-radius: 8px; border: 1px solid #ffebeb;">
                <h4 style="margin: 0 0 10px; color: #1E355A; font-size: 14px; text-transform: uppercase;">Student's Message:</h4>
                <p style="margin: 0; color: #444444; font-size: 15px; line-height: 1.6; font-style: italic;">"${message || 'No specific questions asked.'}"</p>
              </div>
              <div style="margin-top: 40px; text-align: center;">
                <a href="mailto:${email}" style="background: #1E355A; color: #ffffff; padding: 15px 30px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block;">Reply to Student Directly</a>
              </div>
            </div>
            <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #eeeeee;">
              <p style="margin: 0; color: #999999; font-size: 12px;">© 2024 Institute of Management Sciences, Jammu. All rights reserved.<br />This is an automated notification from the IMS Admission Portal.</p>
            </div>
          </div>
        </div>
      `,
    });

    // Mark signature as solved to prevent replay
    usedSignatures.set(signature, challengeTime);

    // Register phone/email cooldowns
    if (normPhone) submissionCache.set(normPhone, now);
    if (normEmail) submissionCache.set(normEmail, now);

    return Response.json({
      success: true,
      message: "Form submitted successfully",
    });

  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "Failed to process admission inquiry" },
      { status: 500 }
    );
  }
}