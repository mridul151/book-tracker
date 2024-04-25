const nodemailer = require('nodemailer');
const { emailTemplate } = require('../templates/emailTemplate');

const sendEmail = async (to, subject, body) => {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
    //   secure: process.env.SMTP_SECURE,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Define the email options
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to,
      subject,
      html: emailTemplate(subject, body),
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (err) {
    console.error('Error sending email:', err);
  }
};

module.exports = sendEmail;