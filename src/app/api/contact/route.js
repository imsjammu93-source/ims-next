import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const formData = await req.json();
    const { name, email, phone, subject, message } = formData;

    // 1. Save to Database via PHP API
    try {
        let apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/contact_messages/add.php`;
        // Ensure IPv4 resolution for local Node.js server-side fetch
        apiUrl = apiUrl.replace('localhost', '127.0.0.1');
        
        console.log("Targeting PHP API at:", apiUrl);
        
        const dbRes = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });
        const dbData = await dbRes.json();
        console.log("PHP API Response:", dbData);
        if (!dbData.success) {
            console.error("DB Save Failed:", dbData.message);
        }
    } catch (dbErr) {
        console.error("DB Connection Error:", dbErr.message);
    }

    // 2. Send Email Notification
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
            ${message.replace(/\n/g, '<br/>')}
          </div>
          <p style="font-size: 0.8rem; color: #64748b; margin-top: 20px;">This message was sent from the IMS Jammu official contact form.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

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
