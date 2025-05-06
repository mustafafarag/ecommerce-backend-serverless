const nodemailer = require("nodemailer");
const asyncHandler = require('express-async-handler');




const sendEmail = asyncHandler(async (data,req, res) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: process.env.MAIL_ID, // generated ethereal user
          pass: process.env.MP, // generated ethereal password
        },
      });
      
      // async..await is not allowed in global scope, must use a wrapper
      async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"Maddison Foo Koch 👻"', // sender address
          to: data.to, // list of receivers
          subject: data.subject, // Subject line
          text: Date.text, // plain text body
          html: data.html, // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
      }
      
      main().catch(console.error);
});




module.exports = { sendEmail };