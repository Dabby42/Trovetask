import nodemailer from 'nodemailer';

 const EmailNotification = async (email, subject="Notification from Dochase Bot", htmlBody) => {

  const transporter = nodemailer.createTransport({
    host: process.env.APP_EMAIL_HOST,
    port: process.env.APP_EMAIL_PORT,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: process.env.APP_EMAIL,
      clientId: process.env.APP_EMAIL_CLIENT_ID,
      clientSecret: process.env.APP_EMAIL_CLIENT_SECRET,
      refreshToken: process.env.APP_REFRESH_TOKEN,
      accessToken: process.env.APP_ACCESS_TOKEN
    },
  });

  const mailOptions = {
    from: `Dochase <${process.env.APP_EMAIL}>`,
    to: Array.isArray(email) && email.length > 1 ? '' : email,
    subject: subject,
    html: htmlBody,
    bcc: Array.isArray(email) && email.length > 1 ? email : '',
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent! Message ID: ", info.messageId);
  } catch (error) {
    console.log('email notification err =>', error);
  }
}

export default EmailNotification;
