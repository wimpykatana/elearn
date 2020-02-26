const CryptoJS = require('crypto-js');

const create = (data) => {
    let encrypt = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.SECRET_ENCRYPT).toString();

    if(process.env.CAPTCHA_HOST === 'localhost') {
        encrypt = data
    }

    return encrypt;
}

exports.create = create;