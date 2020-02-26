const Contents = require('./model');
const Watched = require('./model_watched');
const Queueing = require('../queueing/model');
const videos = require('../../services/populerVideos');
const Category = require('../category/model');
const encrypt = require('../../services/encrypt');

//const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const moment = require('moment');
const exec = require('child_process').exec;

//GET ALL CONTENT
const getAllcontent = async(req, res) => {
    try {
        let result = await Contents.find({}).sort({_id: -1});

        return res.status(200).json({error:false, contents: result});
    } catch(err) {
        return res.status(500).json({error:true, message:err.message});
    }
}

//CHECK USER ALREADY RATED OR NOT
const isRated = async(req,res) => {
    try {
        const { vidid } = req.body;
        const { userid } = req.body;

        let content = await Contents.findOne({
            active: true,
            _id: vidid,
            rate: { $elemMatch: { userHasRate: userid } }

        },{"rate.$":1}, (err, content) => {

            if(err) {
                return res.status(500).json({error:true, message:err.message});
            }
        
            return content;

        });


        if(content){
            
            //user has been rated
            return res.status(200).json({error:false, message: true, value: content })

        } else {

            //user not rated
            return res.status(200).json({error:false, message: false })
        }

    } catch(e) {
        return res.status(500).json({ error:true, message: err.message });
    }
}

//counting courses watched video
const watched = async(req, res) => {
    try {
        await Watched.create({courseId:req.params.id, createdAt: new Date(), userId:req.body.userId});
        await Contents.updateOne({_id:req.params.id}, {$inc: {watched: 1}});

        res.status(200).json({error: false, message: "ok"});
    } catch (err) {
        return res.status(500).json({error:true, message:err.message});
    }
}

const watchedList = async(req, res) => {
    try {
        const arr = await videos.getWatching();

        res.status(200).json({error: false, data: arr, message: "success"});

    } catch(err) {
        return res.status(500).json({error:true, message:err.message});
    }
}

//RATE VIDEO
const rateVideo = async(req,res) => {
    try{
        const { videoid } = req.body;
        const { rate } = req.body;
        const ratingsval = parseInt(rate);
        const { userid } = req.body;

        // let content = "ok";

        let content = await Contents.findOne({
            active: true,
            _id: videoid,
            rate: { $elemMatch: { userHasRate: userid } }

        }, (err, content) => {

            if(err) {
                return res.status(500).json({error:true, message:err.message});
            }

            return content;

        });
        
        if(content){
            Contents.updateOne(
                {
                    _id: videoid,
                    rate: { $elemMatch: { userHasRate: userid }}
                },
                {$set:{
                        "rate.$.ratings": ratingsval
                       // rate: {"rate.$.ratings": ratingsval}
                }},(err) =>{
                    console.log(err);
                },
            );
            return res.status(200).json({error:false, message: "success" })
        }else{

            Contents.updateOne({
                _id: videoid,
            },
            {
                $push: {rate: {userHasRate:userid, ratings: ratingsval}}
            },null,(err)=>{
                if(err){
                    return res.status(500).json({error:true, message:err.message});
                }
                return res.status(200).json({error: false, message: "success"})
            })

        }

    }catch(err){
        return res.status(500).json({error:true, message: err.message});
    }
}

const getContentByCategoryDetail = async(req, res) => {
    try {
        let perPage = 5;

        const page = parseInt(req.query.page);
        const categoryName = req.params.categoryId.trim();
        const id = req.params.id;
        let totalContent;
        let result;

        const categoryData = await Category.findOne({name: categoryName});
        const categoryId = (categoryData) ? categoryData._id : categoryName;

        if(categoryId.toString() === process.env.ID_CATEGORY_LATES_VIDEOS) {
            const limit = parseInt(process.env.LIMIT_LATEST_VIDEO_TO_SHOW);
            const c = Math.ceil(limit / perPage);

            if(c === page && c * perPage >= limit) {
                const d = (c - 1) * perPage;

                perPage = limit - d - 1;
            }

            totalContent = await Contents.find({_id: {'$ne':id}, categoryId:{'$ne':process.env.ID_CATEGORY_PUBLIC_COMPANIES}, active:true}).sort("-uploadDate").limit(limit);
            result = await Contents.find({_id: {'$ne':id}, categoryId:{'$ne':process.env.ID_CATEGORY_PUBLIC_COMPANIES}, active:true}, null).sort("-uploadDate").skip((perPage * page) - perPage).limit(perPage);
        }
        else if(categoryId.toString() === process.env.ID_CATEGORY_POPULARE_VIDEOS) {
            const limit = parseInt(process.env.LIMIT_SHOW_POPULARE_VIDEO);
            const c = Math.ceil(limit / perPage);

            if(c === page && c * perPage > limit) {
                const d = (c - 1) * perPage;

                perPage = limit - d;
            }

            let totalContent = await videos.getWatching();

            let result = await videos.getWatchingPaging(page, perPage);

            return res.status(200).json({error:false, page: 1, contents: result, totalContent: totalContent.length });
        } 
        else if(req.session.user && categoryId === process.env.NAME_CATEGORY_RECENT.trim()) {
            const limit = parseInt(process.env.LIMIT_SHOW_RECENT_VIDEO);
            const c = Math.ceil(limit / perPage);

            if(c === page && c * perPage > limit) {
                const d = (c - 1) * perPage;

                perPage = limit - d;
            }
            let totalContent = await videos.getWatchingByUser(req.session.user._id);

            let result = await videos.getWatchingByUserPaging(req.session.user._id, page, perPage);
            return res.status(200).json({error:false, page: 1, contents: result, totalContent: totalContent.length });
        } else {
            totalContent = await Contents.find({_id: {'$ne':id}, categoryId: categoryId, active:true});
            result = await Contents.find({_id: {'$ne':id}, categoryId:categoryId, active:true}, null).skip((perPage * page) - perPage).limit(perPage);
        }

        return res.status(200).json({error:false, page: page, contents: result, totalContent: totalContent.length });

    } catch(err){
        return res.status(500).json({error:true, message:err.message});
    }
}

const getContentByCategoryLanding = async(req, res) => {
    try {
        let query = {active:true, categoryId: {'$ne':process.env.ID_CATEGORY_PUBLIC_COMPANIES}};

        let perPage = 24;
        let page = (req.query.page) ? parseInt(req.query.page) : 1;

        // just for case latest videos
        if(process.env.ID_CATEGORY_LATES_VIDEOS === req.params.categoryid) {
            const limit = parseInt(process.env.LIMIT_LATEST_VIDEO_TO_SHOW);
            const c = Math.ceil(limit / perPage);

            if(c === page && c * perPage > limit) {
                const d = (c - 1) * perPage;

                perPage = limit - d;
            }

            let totalContent = await Contents.find(query, {video:0, watched:0}).sort("-uploadDate").limit(limit);

            let result = await Contents.find(query, {video:0, watched:0}).sort("-uploadDate").skip((perPage * page) - perPage).limit(perPage);

            return res.status(200).json({error:false, page: 1, contents: result, totalContent: totalContent.length });
        }

        if(req.params.categoryid === process.env.ID_CATEGORY_POPULARE_VIDEOS) {
            const limit = parseInt(process.env.LIMIT_SHOW_POPULARE_VIDEO);
            const c = Math.ceil(limit / perPage);

            if(c === page && c * perPage > limit) {
                const d = (c - 1) * perPage;

                perPage = limit - d;
            }

            let totalContent = await videos.getWatching();

            let result = await videos.getWatchingPaging(page, perPage);

            return res.status(200).json({error:false, page: 1, contents: result, totalContent: totalContent.length });
        }

        //for case recent video
        if(req.session.user && req.params.categoryid === process.env.NAME_CATEGORY_RECENT) {
            const limit = parseInt(process.env.LIMIT_SHOW_RECENT_VIDEO);
            const c = Math.ceil(limit / perPage);

            if(c === page && c * perPage > limit) {
                const d = (c - 1) * perPage;

                perPage = limit - d;
            }

            let totalContent = await videos.getWatchingByUser(req.session.user._id);

            let result = await videos.getWatchingByUserPaging(req.session.user._id, page, perPage);

            return res.status(200).json({error:false, page: 1, contents: result, totalContent: totalContent.length });
        }

        let categoryId = req.params.categoryid.split(",");

        if(categoryId.length > 0 && categoryId[0] !== 'all'){
            query.categoryId = categoryId[0];
        }

        if(req.query.data && req.query.data !== 'undefined'){
            query._id = req.query.data;
        }

        let totalContent = await Contents.find(query, {video:0, watched:0});

        let result = await Contents.find(query, {video:0, watched:0}).skip((perPage * page) - perPage).limit(perPage);

        return res.status(200).json({error:false, page: page, contents: result, totalContent: totalContent.length });

    } catch(err){
        return res.status(500).json({error:true, message:err.message});
    }
}

//CREATE CONTENT
const createContent = async(req, res)=> {
    try {
        const data = req.body;
        const video = req.files.video;
        const videoName = video.name.split(".");
        const imgPre = req.files.imgPre;
        const imgPreName = imgPre.name.split(".");
        const imgDisplay = req.files.imgDisplay;
        const imgDisplayName = imgDisplay.name.split(".");

        const date = moment().format("_YYYY-MM-DD_HH-mm-ss")

        const courses = await Contents.create({
            active:false,
            title: req.body.title,
            categoryId: req.body.categoryId,
            contributorName: req.body.author,
            description: req.body.description,
            enrolled: req.body.enrolled,
            level: req.body.level,
            objective:req.body.objective,
            ratings : req.body.ratings,
            language : req.body.language,
            timeVideo :req.body.timeVideo,
            uploadDate: new Date()
        });

        const dirVid = path.join(__dirname, '../../public/videos/');
        const dirImg = path.join(__dirname, '../../public/images/');

        if (!fs.existsSync(dirVid)){
            await fs.mkdirSync(dirVid);
        }

        if (!fs.existsSync(dirImg)){
            await fs.mkdirSync(dirImg);
        }

        // save file
        await mvFile(video, dirVid + videoName[0] + date + '.' + videoName[1]);
        await mvFile(imgPre, dirImg + imgPreName[0] + date + '.' + imgPreName[1]);
        await mvFile(imgDisplay, dirImg + imgDisplayName[0] + date + '.' + imgDisplayName[1]);

        await Contents.findOneAndUpdate({_id:courses._id}, { $set: { 
            video: videoName[0] + date + '.' + videoName[1],
            imagePreview: imgPreName[0] + date + '.' + imgPreName[1],
            displayImage: imgDisplayName[0] + date + '.' + imgDisplayName[1]
        }});

        await Queueing.create({name: 'ffmpeg', active: true, createdAt: new Date()});

        res.status(200).json({message: 'data berhasil di simpan'});

        const process = exec('bash '+path.join(__dirname, '../../bin/ffmpeg-convert.sh')+' '+dirVid + videoName[0] + date + '.' + videoName[1]+' '+videoName[0], {
            maxBuffer: 1024 * 1024 * 10
        }, async function(err, stdout, stderr) {

            if(err) {
                await Queueing.deleteOne({name: 'ffmpeg'});
                
                console.log('ERROR CONVERT FFMPEG => ',err)

                if(req.session.admin) {
                    req.io.sockets.emit('uploadCompress_'+video.name+'_'+req.session.admin._id, "The "+videoName[0]+" Video Convert Failed");
                }

                // delete file upload
                exec('rm '+dirVid + videoName[0] + date + '.' + videoName[1], function() {
                    if(err) {
                        console.log("delete file mp4 "+dirVid + videoName[0] + date + '.' + videoName[1]+"error");
                        console.log(err);
                    }
                })
            }

            if(!err) {
                // Udate course with hls video
               const update = await Contents.findOneAndUpdate({_id:courses._id},{ $set: {
                    active: true,
                    video: `${videoName[0]}/${videoName[0]}__2019070180922x.m3u8`
                }});

                await Queueing.deleteOne({name: 'ffmpeg'});

                if(req.session.admin) {
                    req.io.sockets.emit('uploadCompress_'+video.name+'_'+req.session.admin._id, "The "+videoName[0]+" Video Convert Succeed");
                }

                // delete file upload
                exec('rm '+dirVid + videoName[0] + date + '.' + videoName[1], function() {
                    if(err) {
                        console.log("delete file mp4 "+dirVid + videoName[0] + date + '.' + videoName[1]+"error");
                        console.log(err);
                    }
                })
            }

        });

        var length = null;
        var currenttime = 0;
        var regex = /Duration:(.*), start:/;
        var regex2 = /time=(.*) bitrate/;

        process.stderr.on('data', async(data) => {
            var buff = new Buffer(data);
            var str = buff.toString('utf8')

            var Duration_matches = str.match(regex);
            var Current_matches = str.match(regex2);
            if (Duration_matches) {
                length = timeString2ms(Duration_matches[1]);
            }

            if (Current_matches) {
                currenttime = timeString2ms(Current_matches[1]);
            }

            const progress = Math.ceil((currenttime / length) * 100);

            req.io.sockets.emit('log upload_'+video.name+'_'+req.session.admin._id, {done:false, progress: progress, message: str});
        })
        
        process.on('exit', (code) => {
            req.io.sockets.emit('log upload_'+video.name+'_'+req.session.admin._id, {done:true, progress:100, message: code.toString()});
        });

    } catch(err) {
        return res.status(500).json({error:true, message:err.message});
    }
}

//get single course
const getSingleContent = async (req,res,next) => {
    try {
        const id = String(req.params.id);
        let result = await Contents.findById(id);

        return res.status(200).json({error:false, content: result});

    } catch(err){
        return res.status(500).json({error:true, message:err.message});
    }
}

const getSingleContentfrontend= async (req,res,next) => {
    try {
        const id = String(req.params.title).replace(/-/g," ");
        console.log(id)
        console.log("called");
        // let result = await Contents.findById(id);

        let result = await Contents.findOne({ title: id });
        const data = encrypt.create(result)
        res.status(200).json({error:false, content: data});

        //const total = await Watched.find({courseId: result._id}).count();
        
        //await Contents.updateOne({_id:result._id}, {$set: {watched:total}});
    }
    catch(err){
        return res.status(500).json({error:true, message:err.message});
    }
}

//upload video
const uploadVideo = async(req, res) => {
    try {
        let uploadFile = req.files.file;
        const id = req.body.id;
        const categoryId = req.body.categoryId;
        const name = uploadFile.name.split(".");
        const date = moment().format("_YYYY-MM-DD_HH-mm-ss")

        const dir = path.join(__dirname, '../../public/videos/');

        if (!fs.existsSync(dir)){
            await fs.mkdirSync(dir);
        }

        await mvFile(uploadFile, dir + name[0] + date + '.' + name[1]);
        await Contents.findOneAndUpdate({_id:id}, { $set: { active: false, video: name[0] + date + '.' +name[1]}});

        await Queueing.create({name: 'ffmpeg', active: true, createdAt: new Date()});
        res.status(200).json({error: false, message: 'succes', file: uploadFile.name});

        const process = exec('bash '+path.join(__dirname, '../../bin/ffmpeg-convert.sh')+' '+dir + name[0] + date + '.' + name[1]+' '+ name[0], {
            maxBuffer: 1024 * 1024 * 10
        }, async function(err, stdout, stderr) {

            if(err) {
                await Queueing.deleteOne({name: 'ffmpeg'});
                
                console.log('ERROR CONVERT FFMPEG => ',err)
                
                if(req.session.admin) {
                    req.io.sockets.emit('uploadCompress_'+id+'_'+req.session.admin._id, "The "+name[0]+" Video Convert Failed");
                }

                exec('rm ' + dir + name[0] + date + '.' + name[1], function() {
                    if(err) {
                        console.log("delete file mp4 "+dir + name[0] + date + '.' + name[1]+"error");
                        console.log(err);
                    }
                });
            }

            if(!err) {
                // Udate course with hls video
                await Contents.findOneAndUpdate({_id:id},{ $set: { 
                    active:true,
                    video: `${name[0]}/${name[0]}__2019070180922x.m3u8`
                }});

                await Queueing.deleteOne({name: 'ffmpeg'});

                if(req.session.admin) {
                    req.io.sockets.emit('uploadCompress_'+id+'_'+req.session.admin._id, "The "+name[0]+" Video Convert Succeed");
                    
                }

                exec('rm ' + dir + name[0] + date + '.' + name[1], function() {
                    if(err) {
                        console.log("delete file mp4 "+dir + name[0] + date + '.' + name[1]+"error");
                        console.log(err);
                    }
                });
            }

        });
        
        var length = null;
        var currenttime = 0;
        var regex = /Duration:(.*), start:/;
        var regex2 = /time=(.*) bitrate/;

        process.stderr.on('data', async(data) => {
            var buff = new Buffer(data);
            var str = buff.toString('utf8')
 
            var Duration_matches = str.match(regex);
            var Current_matches = str.match(regex2);
            if (Duration_matches) {
                length = timeString2ms(Duration_matches[1]);
            }

            if (Current_matches) {
                currenttime = timeString2ms(Current_matches[1]);
            }

            const progress = Math.ceil((currenttime / length) * 100);

            req.io.sockets.emit('log_'+id+'_'+req.session.admin._id, {done:false, progress: progress, message: str});

            req.io.sockets.emit('onedit'+id, {onEdit:true});
        })
        
        process.on('exit', (code) => {
            req.io.sockets.emit('log_'+id+'_'+req.session.admin._id, {done:true, progress:100, message: code.toString()});
        });
    } catch(err) {
        return res.status(500).json({error:true, message:err.message});
    }
}

function timeString2ms(a,b,c){// time(HH:MM:SS.mss)
    return c=0,
        a=a.split('.'),
        !a[1]||(c+=a[1]*1),
        a=a[0].split(':'),b=a.length,
        c+=(b==3?a[0]*3600+a[1]*60+a[2]*1:b==2?a[0]*60+a[1]*1:s=a[0]*1)*1e3,
        c
}

//upload video poster
const uploadVideoPoster = async(req, res) => {
    try {
        console.log("called");
        let uploadFile = req.files.file;
        let datereq = Math.floor(Date.now());
        const id = req.body.id;
        const categoryId = req.body.categoryId;

        const dir = path.join(__dirname, '../../public/images/'+categoryId+'/');

        if (!fs.existsSync(dir)){
            await fs.mkdirSync(dir);
        }

        await mvFile(uploadFile, dir+uploadFile.name);

        await Contents.findOneAndUpdate({_id:id}, { $set: { imagePreview: categoryId+'/'+uploadFile.name}});
       
        return res.status(200).json({
            error: false,
            message: 'succes',
            file: `${uploadFile.name}`,
        });

    } catch(err) {
        return res.status(500).json({error:true ,message:err.message});
    }
}

//upload display image
const uploadDisplayImage = async(req,res,next) => {
    try {
        
        let uploadFile = req.files.file;
        const id = req.body.id;
        const categoryId = req.body.categoryId;

        const dir = path.join(__dirname, '../../public/images/'+categoryId+'/');

        if (!fs.existsSync(dir)){
            await fs.mkdirSync(dir);
        }

        await mvFile(uploadFile, dir+uploadFile.name);

        await Contents.findOneAndUpdate({_id:id}, { $set: { displayImage: categoryId+'/'+uploadFile.name, uploadDate: Date.now()}});
        
        return res.status(200).json({
            error: false,
            message: 'succes',
            file: `${uploadFile.name}`,
        });
    } catch(err) {
        return res.status(500).json({error:true ,message:err.message});
    }
}

//update
const updateSingleContent = async (req, res, next) => {
    try {
        const { id } = req.body;

        const updateContent = await Contents.findOneAndUpdate({_id:id}, { $set: req.body},null);

        return res.status(200).json({error: false, message: id, content: updateContent})

    } catch(err){
        return res.status(500).json({error:true ,message:err.message});
    }
}

const search = async (req, res) => {
    try {
        let categoryIds = [];
        let ids = []
        let text = (req.body.search) ? req.body.search.substring(0, 15) : null ;
        let query = (text) ? {$text: {$search: text} } : {$text: {$search: '' } }
    
        query.active = true;
        
        if(req.body.search2.length > 0) {
            req.body.search2.forEach(async (item) => {
                await  categoryIds.push(item.id);
            });

            query.categoryId = categoryIds;
        }

        

        if(req.body.search3) {
            query._id = req.body.search3.id;
        }
        
        const data = await Contents.find(query).populate("categoryId");
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({error:true ,message:err.message});
    }
}

function mvFile(uploadFile, dir) {
    return new Promise((resolve, reject) => {
        uploadFile.mv(dir, function(err){
            if(err) {
                return reject(err)
            }

            resolve({error:false, message:"Upload Succeed"});
        });
    });
}

const whatsapp = async (req, res) => {
    try {
        const {action, keyword} = req.query;
        let data;

        const category = await Category.findOne({_id:process.env.ID_CATEGORY_LATES_VIDEOS});

        if(action === '1') {
           data = await Contents.aggregate([{
               $match: {active:true}
            }, {
                $project: {
                    _id:0,
                    title: "$title",
                    uploadDate: "$uploadDate"
                }
            }, {
                $sort: {uploadDate: -1}
            }, {
                $limit:10
            }]);

            await Promise.all(
                data.map((item) => {
                    item.videolink = "https://www.tell.co.id/courses/"+category.name.replace(/ /g, "-")+"/"+item.title.replace(/ /g, "-");
                })
            )
        }

        if(action === '2') {
            data = await await Category.aggregate([{
                $match: {type: 'main'}
             }, {
                 $project: {
                     _id:0,
                     name: "$name"
                 }
             }, {
                 $sort: {_id: -1}
             }]);

            await Promise.all(
                data.map(async (item) => {
                   item.categorylink = "https://www.tell.co.id/category/"+item.name.replace(/ /g, "-");
                })
            )
        }

        if(action === '3') {
            data = await Contents.aggregate([{
                $match: {$text: {$search:keyword}}
             }, {
                 $sort: {_id: -1}
             }]);

            const arr = []
            await Promise.all(
                data.map(async (item) => {
                    arr.push({
                        title:item.title,
                        videolink: "https://www.tell.co.id/category/"+item.title.replace(/ /g, "-")
                    });
                })
            )

            data = arr
        }


        return res.status(200).json({message: "success", status:true, data: data})
    }
    catch(err) {
        return res.status(500).json({error:true ,message:err.message});
    }
}

const total = async (req, res) => {
    try {
        const data = await Contents.aggregate([{
                $match: {active: true}
        }, { 
            $group: { 
                _id: "$categoryId",
                count: { 
                    $sum: 1 
                }
            }
        }, {
            $lookup: {
                from: "categories",
                localField: "_id",
                foreignField: "_id",
                as: "Category"
            }
        }, {
            $unwind: "$Category"
        }, {
            $project: {
                "_id":0,
                "Category.parentId":0,
                "Category.description":0,
                "Category.createdAt":0,
                "Category.__v":0,
                "Category.banner":0,
            }
        }, {
            $sort: {
                count:-1
            }
        }]);

        return res.status(200).json({message: "success", status:true, data: data})
    }
    catch(err) {
        return res.status(500).json({error:true ,message:err.message});
    }
}

exports.search = search;
exports.getAllcontent = getAllcontent;
exports.createContent = createContent;
exports.getSingleContent = getSingleContent;
exports.updateSingleContent = updateSingleContent;
exports.uploadVideo = uploadVideo;
exports.uploadVideoPoster = uploadVideoPoster;
exports.uploadDisplayImage = uploadDisplayImage;
exports.getContentByCategoryDetail = getContentByCategoryDetail;
exports.getContentByCategoryLanding = getContentByCategoryLanding;
exports.rateVideo = rateVideo;
exports.isRated = isRated;
exports.getSingleContentfrontend = getSingleContentfrontend;
exports.watched = watched;
exports.watchedList = watchedList;
exports.whatsapp = whatsapp;
exports.total = total;