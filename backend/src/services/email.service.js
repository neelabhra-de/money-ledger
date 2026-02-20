require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 60000,
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"MoneyLedger" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

async function sendRegistrationEmail(userEmail, name) {
    const subject = 'Welcome to MoneyLedger!';
    const text = `Hello ${name},\n\nThank you for registering at MoneyLedger. We're excited to have you on board!\n\nBest regards,\nThe MoneyLedger Team`;
    const html = `<p>Hello ${name},</p><p>Thank you for registering at Backend Ledger. We're excited to have you on board!</p><p>Best regards,<br>The MoneyLedger Team</p>`;

    await sendEmail(userEmail, subject, text, html);
}

// async function sendTransactionEmail(userEmail, name, amount, toAccount) {
//     const subject = 'Transaction Successful!';
//     const text = `Hello ${name},\n\nYour transaction of $${amount} to account ${toAccount} was successful.\n\nBest regards,\nThe Backend Ledger Team`;
//     const html = `<p>Hello ${name},</p><p>Your transaction of $${amount} to account ${toAccount} was successful.</p><p>Best regards,<br>The Backend Ledger Team</p>`;

//     await sendEmail(userEmail, subject, text, html);
// }




async function sendTransactionEmail(userEmail, name, amount, account, direction = "DEBIT") {
    const isCredit = direction === "CREDIT";
    const subject = isCredit ? 'Amount Received Successfully!' : 'Transaction Successful!';
    const text = isCredit
      ? `Hello ${name},\n\nYou have received ₹${amount} in your account from account ${account}.\n\nBest regards,\nThe MoneyLedger Team`
      : `Hello ${name},\n\nYour transaction of ₹${amount} to account ${account} was successful.\n\nBest regards,\nThe MoneyLedger Team`;
    const html = isCredit
      ? `<p>Hello ${name},</p><p>You have received ₹${amount} in your account from account ${account}.</p><p>Best regards,<br>The MoneyLedger Team</p>`
      : `<p>Hello ${name},</p><p>Your transaction of ₹${amount} to account ${account} was successful.</p><p>Best regards,<br>The MoneyLedger Team</p>`;

    await sendEmail(userEmail, subject, text, html);
}






async function sendTransactionFailureEmail(userEmail, name, amount, toAccount) {
    const subject = 'Transaction Failed';
    const text = `Hello ${name},\n\nWe regret to inform you that your transaction of $${amount} to account ${toAccount} has failed. Please try again later.\n\nBest regards,\nThe Backend Ledger Team`;
    const html = `<p>Hello ${name},</p><p>We regret to inform you that your transaction of $${amount} to account ${toAccount} has failed. Please try again later.</p><p>Best regards,<br>The Backend Ledger Team</p>`;

    await sendEmail(userEmail, subject, text, html);
}


module.exports = {
   sendRegistrationEmail,
   sendTransactionEmail,
   sendTransactionFailureEmail
 };
