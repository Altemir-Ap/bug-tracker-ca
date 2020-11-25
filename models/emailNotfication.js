const nodemailer = require('nodemailer');
const senderEmail = process.env.EMAIL;
const senderPassword = process.env.PASSWORD;
module.exports = () => {
  const email = async (e) => {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: senderEmail,
        pass: senderPassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // send mail with defined transport object
    await transporter.sendMail({
      from: 'bug.tracker.ca.cct@gmail.com', // sender address
      to: e, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>', // html body
    });
  };
  return { email };
};
