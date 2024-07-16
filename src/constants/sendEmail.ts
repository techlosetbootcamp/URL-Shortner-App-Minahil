import nodemailer from 'nodemailer';
export default async function sendResetPasswordEmail(email: string, token: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "minahilismail44@gmail.com",
        pass: "ttjt sobw lfww mdjr",
      },
    });
  
    const mailOptions = {
      from: "URL Shortner App",
      to: email,
      subject: 'Password Reset',
      text: `You requested a password reset. Click the link to reset your password: ${process.env.NEXTAUTH_URL}/password/reset/${token}`,
    };
  
    await transporter.sendMail(mailOptions);
  }
  