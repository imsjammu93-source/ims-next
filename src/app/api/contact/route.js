import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, email, phone, course, message } = body;

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
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border-top: 6px solid #FF2D1E;">
            
          
            <div style="background: #1E355A; padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">IMS JAMMU</h1>
              <p style="color: #FF2D1E; margin: 5px 0 0; font-size: 14px; font-weight: bold; text-transform: uppercase;">Admission Portal Enquiry</p>
            </div>

         
            <div style="padding: 40px;">
              <h2 style="color: #1E355A; margin-top: 0; font-size: 20px; border-bottom: 1px solid #eeeeee; padding-bottom: 15px;">New Student Enquiry</h2>
              
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr>
                  <td style="padding: 12px 0; color: #777777; font-size: 14px; width: 30%;">Student Name</td>
                  <td style="padding: 12px 0; color: #1E355A; font-weight: bold; font-size: 15px;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #777777; font-size: 14px;">Applied Course</td>
                  <td style="padding: 12px 0; color: #FF2D1E; font-weight: bold; font-size: 15px;">${course}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #777777; font-size: 14px;">Phone Number</td>
                  <td style="padding: 12px 0; color: #1E355A; font-weight: bold; font-size: 15px;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #777777; font-size: 14px;">Email Address</td>
                  <td style="padding: 12px 0; color: #1E355A; font-weight: bold; font-size: 15px;">${email}</td>
                </tr>
              </table>

              <div style="margin-top: 30px; padding: 25px; background: #fff9f9; border-radius: 8px; border: 1px solid #ffebeb;">
                <h4 style="margin: 0 0 10px; color: #1E355A; font-size: 14px; text-transform: uppercase;">Student's Message:</h4>
                <p style="margin: 0; color: #444444; font-size: 15px; line-height: 1.6; font-style: italic;">
                  "${message || 'No specific questions asked.'}"
                </p>
              </div>

              <div style="margin-top: 40px; text-align: center;">
                <a href="mailto:${email}" style="background: #1E355A; color: #ffffff; padding: 15px 30px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block;">
                  Reply to Student Directly
                </a>
              </div>
            </div>

          
            <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #eeeeee;">
              <p style="margin: 0; color: #999999; font-size: 12px;">
                © 2024 Institute of Management Sciences, Jammu. All rights reserved.<br />
                This is an automated notification from the IMS Admission Portal.
              </p>
            </div>
          </div>
        </div>
      `,
    });

    return Response.json({
      success: true,
      message: "Form submitted successfully",
    });

  } catch (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
        message: "Failed to send email",
      },
      { status: 500 }
    );
  }
}