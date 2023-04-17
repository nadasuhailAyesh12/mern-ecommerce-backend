const nodemailer = require('nodemailer');
const { nodemailerConfig } = require('../config/enviroment')

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: nodemailerConfig.host,
        port: nodemailerConfig.port,
        auth: {
            user: nodemailerConfig.user,
            pass: nodemailerConfig.password
        }
    });

    const message = {
        from: `${nodemailerConfig.name} <${nodemailerConfig.from}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    }
    await transporter.sendMail(message);
}

module.exports = sendEmail;