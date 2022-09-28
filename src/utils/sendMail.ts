import nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(email: string, code: string) {
  // let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    service: "hotmail",
    // host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL || "", 
      pass: process.env.EMAIL_PASSWORD || "", 
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"Taxio 🚖" <${process.env.EMAIL || ""}>`, // sender address
    to: email, // list of receivers
    subject: "TAXIO CONFIRMATION CODE", // Subject line
    text: "Hello there", // plain text body
    html: `<p>Verification Code: <h1>${code}</h1></p>`, // html body
  });

  console.log("Message sent: %s", info.response);
}

//  testingTaxiomail123

