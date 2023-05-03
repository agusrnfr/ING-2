const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "veterinaria.omd@gmail.com",
    pass: "yqlorxiixvddfenx",
  },
});

transporter.verify().then(() => {
  console.log('Ready for send emails');
});

module.exports = { 
  transporter,
};