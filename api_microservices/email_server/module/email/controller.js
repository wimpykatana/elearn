'use strict'

const EmailHistory = require('./model');
const nodemailer = require("nodemailer");

const send = async (req, res) => {
    try {
        const {from_title, to, subject, text, html, cc, bcc} = req.body;

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            ports: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL_SENDER,
                clientId: process.env.G_CLIENTID,
                clientSecret: process.env.G_CLIENTSECRET,
                refreshToken: process.env.G_REFRESTOKEN,
            }
        });

        let mailOptions = {
            from: from_title, // ex : noreply@tell.co.id <noreply@tell.co.id>,
            to: to,
            subject: subject,
            text: text,
            cc:cc,
            bcc:bcc,
            html: html,
        };

        res.status(201).json({message: 'Email dikirim'});

        const sendEmail = await transporter.sendMail(mailOptions);

        console.log('Email berhasil di kirim');

        await EmailHistory.create({data:JSON.stringify(sendEmail), status:'delivered'});

        console.log('history kirim email berhasil di simpan');
    }
    catch (err) {
        //need add to table email error history
        console.log("***********************************************");
        console.log('======send email failed with error bellow======');
        console.log(err);
        await EmailHistory.create({data:JSON.stringify(err), status: (err.errno) ? err.errno : 'failed'});

        console.log("===============================================");
        console.log("***********************************************")
    }
}

exports.send = send;