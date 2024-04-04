// backend/utils/mailer.js

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'karthickashwin@gmail.com',
        pass: 'ashwin@123'
    }
});

module.exports = transporter;
