const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

// const api_key = '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';
const api_key = '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';
const transporter = nodemailer.createTransport( 
  sendgridTransport({ auth: { api_key: api_key }})
);

exports.postEmail = (req, res, next) => {
  const { idUser, products, total, fullname, email, phone, address } = req.query;
  const message = {
    to: email,
    from: 'nhatnpmFX19824@funix.edu.vn',
    subject: 'Order success',
    html: `<p>Your order</p>`
  }
  transporter.sendMail(message)
    .then(res => {
      if(res) {
        console.log('send_email');
        console.log(res);
      }
    })
}