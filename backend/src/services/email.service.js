require("dotenv").config();
const nodemailer = require("nodemailer");

const EMAIL_PROVIDER = (process.env.EMAIL_PROVIDER || "smtp").toLowerCase();
const EMAIL_FROM = process.env.EMAIL_FROM || `MoneyLedger <${process.env.EMAIL_USER}>`;

let transporter = null;
let resendClient = null;

if (EMAIL_PROVIDER === "smtp") {
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_USER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 60000,
  });

  transporter.verify((error) => {
    if (error) {
      console.error("Error connecting to email server:", error);
    } else {
      console.log("Email server is ready to send messages (SMTP)");
    }
  });
}

if (EMAIL_PROVIDER === "resend") {
  try {
    const { Resend } = require("resend");
    resendClient = new Resend(process.env.RESEND_API_KEY);
    console.log("Email provider initialized (Resend)");
  } catch (error) {
    console.error("Resend SDK not found. Run: npm i resend");
  }
}

const sendEmail = async (to, subject, text, html) => {
  try {
    if (EMAIL_PROVIDER === "resend") {
      if (!resendClient) {
        throw new Error("Resend client is not initialized");
      }

      const result = await resendClient.emails.send({
        from: EMAIL_FROM,
        to,
        subject,
        text,
        html,
      });

      console.log("Message sent (Resend):", result?.data?.id || result?.id || "ok");
      return;
    }

    if (!transporter) {
      throw new Error("SMTP transporter is not initialized");
    }

    const info = await transporter.sendMail({
      from: EMAIL_FROM,
      to,
      subject,
      text,
      html,
    });

    console.log("Message sent (SMTP):", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

async function sendRegistrationEmail(userEmail, name) {
  const subject = "Welcome to MoneyLedger!";
  const text = `Hello ${name},\n\nThank you for registering at MoneyLedger. We are excited to have you on board!\n\nBest regards,\nThe MoneyLedger Team`;
  const html = `<p>Hello ${name},</p><p>Thank you for registering at MoneyLedger. We are excited to have you on board!</p><p>Best regards,<br>The MoneyLedger Team</p>`;

  await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionEmail(userEmail, name, amount, account, direction = "DEBIT") {
  const isCredit = direction === "CREDIT";
  const subject = isCredit ? "Amount Received Successfully!" : "Transaction Successful!";
  const text = isCredit
    ? `Hello ${name},\n\nYou have received INR ${amount} in your account from account ${account}.\n\nBest regards,\nThe MoneyLedger Team`
    : `Hello ${name},\n\nYour transaction of INR ${amount} to account ${account} was successful.\n\nBest regards,\nThe MoneyLedger Team`;
  const html = isCredit
    ? `<p>Hello ${name},</p><p>You have received INR ${amount} in your account from account ${account}.</p><p>Best regards,<br>The MoneyLedger Team</p>`
    : `<p>Hello ${name},</p><p>Your transaction of INR ${amount} to account ${account} was successful.</p><p>Best regards,<br>The MoneyLedger Team</p>`;

  await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionFailureEmail(userEmail, name, amount, toAccount) {
  const subject = "Transaction Failed";
  const text = `Hello ${name},\n\nWe regret to inform you that your transaction of INR ${amount} to account ${toAccount} has failed. Please try again later.\n\nBest regards,\nThe MoneyLedger Team`;
  const html = `<p>Hello ${name},</p><p>We regret to inform you that your transaction of INR ${amount} to account ${toAccount} has failed. Please try again later.</p><p>Best regards,<br>The MoneyLedger Team</p>`;

  await sendEmail(userEmail, subject, text, html);
}

module.exports = {
  sendRegistrationEmail,
  sendTransactionEmail,
  sendTransactionFailureEmail,
};
