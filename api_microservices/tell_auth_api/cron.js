const cron = require('node-cron');
const AuthModel = require('./module/auth/model.js');
const moment = require('moment');
const next = moment().add(1, 'minutes');
const axios = require("axios");
const EmitenModel = require('./module/emiten/model')

cron.schedule('*/60 * * * *', async () => {
    try {
        return console.log('start', new Date())
        const data = await axios.get("https://stmp.trimegah.id/stockinit");
        const arr = data.data.split("\n");
        const arr2 = [];
        const arr3 = [];

        await Promise.all(
            arr.map((item) => {
                arr2.push(item.split('|'));
            })
        );
        
        await Promise.all(
            arr2.map(async (item) => {
                if(item[12] === '1' && item[0].split("-").length === 1) {
                  //  let apa = await EmitenModel.create({code:item[0],name:item[2], createdAt: new Date()});
                   // console.log(apa)
                    arr3.push({code:item[0], name:item[2]})
                }
            })
        );

        console.log('end', new Date());
        console.log(arr3.length);
    } catch(err) {
        console.log('ini error', err.response.data)
    }
  
});
