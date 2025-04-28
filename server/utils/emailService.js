const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail', // or your SMTP service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendUnlockNotification = async (to, title) => {
  try {
    await transporter.sendMail({
      from: `"EchoVerse" <${process.env.EMAIL_USER}>`,
      to,
      subject: "✨ Your EchoVerse Entry has Unlocked!",
      html: `
        <div style="font-family:sans-serif; padding:20px;">
          <h2>✨ A Memory Awaits You!</h2>
          <p>Hi there!</p>
          <p>Your entry <b>"${title}"</b> has now been unlocked and is waiting for you.</p>
          <p>Go visit your EchoVerse and relive your thoughts. 💭✨</p>
          <br/>
          <p>With Love,</p>
          <p>EchoVerse Team 🌌</p>
        </div>
      `
    });
    console.log(`Email sent to ${to} for unlocked entry.`);
  } catch (error) {
    console.error("Error sending unlock email:", error);
  }
};

module.exports = { sendUnlockNotification };
