const nodemailer = require("nodemailer");
const axios = require('axios');

const send = async(data) => {
    try {
        // const transporter = nodemailer.createTransport({
        //     host: 'smtp.gmail.com',
        //     ports: 465,
        //     secure: true,
        //     auth: {
        //         type: 'OAuth2',
        //         user: process.env.EMAIL_SENDER,
        //         clientId: process.env.G_CLIENTID,
        //         clientSecret: process.env.G_CLIENTSECRET,
        //         refreshToken: process.env.G_REFRESTOKEN,
        //     }
        // });
    
        let mailOptions = {
            from_title: data.from,
            to: data.to,
            subject: data.subject,
            bcc: (data.bcc) ? data.bcc : ' ',
            cc: (data.cc) ? data.cc : ' ',
            text: data.text,
            html: data.html,
        };
    
        ///res.status(201).json({message: 'Email dikirim'});
    
       // await transporter.sendMail(mailOptions);
       await axios.post(process.env.HTTP_SENDER_EMAIL, mailOptions);

        console.log('email sending succeed');
    
    }
    catch(err) {console.log(err)
        console.log("=========emial send error=======");
        console.log(err.message);
        console.log("================================");
    }
}

exports.send = send;
