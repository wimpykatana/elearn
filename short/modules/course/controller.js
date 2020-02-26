const Contents = require('./model');
const Categori = require("../category/model");
const shortid = require('shortid');

//const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
// const moment = require('moment');
const exec = require('child_process').exec;
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

//GET ALL CONTENT and Update

// cara updatenya
// db.getCollection('contens').updateOne(
//     {_id: ObjectId("5c2dd3c0af175218771ada56")},
//     {$push: {rate: {userHasRate:"wimpy",ratings: 2}}}
// )

const getAllContentAndUpdate = async(req, res) => {
    try {

        function updatedata(id,userrate,ratevalue){
            return promise = new Promise(function (resolve,reject) {

                Contents.findOneAndUpdate(
                    { _id: id},
                    {
                        $push: {rate: {userHasRate: userrate, ratings: ratevalue}}
                    })
                    .then(result => {
                        console.log("called");
                        resolve("done");
                    })
                    .catch(err => {
                        console.log(err);
                        reject(err);
                    })
  
            })
        }

        async function asyncCall(id,userhasrate,ratevalue) {
            console.log('calling');

            let result = await updatedata(id,userhasrate,ratevalue);

            console.log(result);
          }

        let result = await Contents.find({}); 

        let rl = result.length;
        // let rl = 1;

        for (let i = 0; i < rl; i++) {

            let lengthRating =  result[i].ratings.length;
    
            for(let z = 0, p = Promise.resolve(); z < lengthRating; z++ ){

                let ac = asyncCall(result[i]._id,result[i].userhasRate[z],result[i].ratings[z]);

            }
        }

    } catch(err) {
       return err.message
    }
}

const getAllContent = async(req,res) =>{
    try{
        let result = await Contents.find({});
        let rl = result.length;
        // console.log(JSON.stringify(result));

        while(rl--){
            console.log(result[rl].title);
        }


    } catch(err){
        return err.message
    }
}

const ratingsChange = async(req, res) => {
    let result = await Contents.find({active: true}); 

    await Promise.all(
        result.map(async (item, index) => {
            let data = await collectData(item);
     
            //console.log(data, index)
         })
    );

    console.log("selesai")
    
}

const collectData = async(item) => {
    return new Promise((resolve, reject) => {
        Promise.all(
            item.userhasRate.map(async (item2 , index) => {
                if(item2) {
                   const update =  await Contents.findOneAndUpdate(
                        { _id: item._id},
                        {
                            $addToSet: {rate: {userHasRate: item2, ratings: item.ratings[index]}}
                        });

                    console.log("update done", item._id)
                    resolve({userHasRate: item2, ratings: item.ratings[index]})
                }
            })
        )
        
    })
}

exports.getAllContentAndUpdate = getAllContentAndUpdate;
exports.getAllContent = getAllContent;
exports.ratingsChange = ratingsChange;