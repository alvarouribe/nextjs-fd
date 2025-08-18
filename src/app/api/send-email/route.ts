import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const formData = await request.json();
  const password = process.env.password;
  const fromEmail = process.env.fromEmail;
  console.log('formData', formData);

  // Configure the transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or use another SMTP provider
    auth: {
      user: fromEmail,
      pass: password,
    },
  });

  const mailOptions = {
    from: fromEmail,
    to: 'iam@alvarouribe.cl',
    subject: 'New Contact Form Submission',
    text: `TEXT ${formData.message} + ' | Sent from: ' + ${formData.email}`,
    html: `
      <div>
        <p>Client <strong> ${formData?.firstName} ${formData?.lastName} </strong> wants to contact you</p>
        <ul>
          <li>Email: ${formData.email} </li>
          <li>Phone: ${formData.phone} </li>
          <li>Message: ${formData.message}</li>
        </ul>
      </div>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
