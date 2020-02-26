const ContactUs = require('./model');
const email = require('../../services/email');

const create = async(req, res) => {
    try {
        req.body.createdAt = new Date();

        await ContactUs.create(req.body);

        res.render('contact_us.html', req.body, function(err, html) {
            if(err) {
               throw err;
            }

            email.send({
                from: `noreply@tell.co.id <${process.env.EMAIL_SENDER}>`,
                to: process.env.EMAIL_CONTACT_US,
                bcc: process.env.BCC_EMAIL_CONTACT_US,
                subject: 'Contact Us from user',
                text: 'this text',
                html: html
            });
        });

        return res.status(200).json({error:false, message: "Success"});
    } catch (err) {
        return res.status(500).json({error:true, message:err.message});
    }
}

exports.create = create;