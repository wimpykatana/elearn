const Category = require('./model');
const Courses = require('../course/model');
const videos = require('../../services/populerVideos');
const _ = require("underscore");
const path = require('path');
const fs = require('fs');

//get all content
const getAllCategory = async(req, res) => {
    try {

        let result = await Category.find({type: 'main'});

        return res.status(200).json({error:false, contents: result});
    } 
    catch (err) {
        return res.status(500).json({error:true, message:err.message});
    }
}

const getAllCategoryAdmin = async(req, res) => {
    try {

        let result = await Category.find({});

        return res.status(200).json({error:false, contents: result});
    } 
    catch (err) {
        return res.status(500).json({error:true, message:err.message});
    }
}


//get all content
const getAllCategoryAndContent = async(req, res) => {
    try {
        // let result = await Category.find({});
        // const array = [];
        const data = await Category.aggregate([{
            $lookup: {
                from: "contens",
                let: {
                    id: "$_id"
                },
                pipeline: [{ 
                    $match: {
                        $expr: { $eq: [ '$categoryId', '$$id' ] }
                    }
                }, { 
                    $match: {
                        $expr: { $eq: [ '$active', true ] }
                    }
                }, {
                    $sort: {_id: -1}
                }, {
                    $limit: parseInt(process.env.LIMIT_CONTENT_CATEGORY)
                }],
                as: "courses"
            }
        }, {
            $project:{
                "courses.video": 0
            }
        }, {
            $sort: {
                createdAt: 1
            }
        }]);

        await Promise.all(
            data.map(async (item) => {
                if (JSON.stringify(item._id) === '"'+process.env.ID_CATEGORY_LATES_VIDEOS+'"') {
                    item.courses = await Courses.find({active: true, categoryId: {'$ne':process.env.ID_CATEGORY_PUBLIC_COMPANIES}}, {video:0, watched:0}).sort("-uploadDate").limit(parseInt(process.env.LIMIT_CONTENT_CATEGORY));
                }
                else if(JSON.stringify(item._id) === '"'+process.env.ID_CATEGORY_PUBLIC_COMPANIES+'"') {
                    item.courses = await Courses.find({active: true, categoryId: item._id}, {video:0, watched:0}).sort("title").limit(parseInt(process.env.LIMIT_CONTENT_CATEGORY));
                }
                else if (JSON.stringify(item._id) === '"'+process.env.ID_CATEGORY_POPULARE_VIDEOS+'"') {
                    item.courses = await videos.getWatching('landing');
                }
            })
        );

        return res.status(200).json({error:false, contents: data});
    } 
    catch (err) {
        return res.status(500).json({error:true, message:err.message});
    }
}

//create category
const createCategory = async(req, res, next)=>{
    try {
        const {
            name,
            parentId,
            description,
            type,
        } = req.body;

        const exist = await Category.findOne({name: name});

        if(exist) {
            throw {
                message: "Name category already exist"
            }
        }

        const createCategory = await Category.create({
            name: name,
            parentId: parentId,
            description: description,
            type: type,
            createdAt: new Date()
        });

        return res.status(201).json({ error:false, message: 'success create category', contents: createCategory });

    } catch(err){
        return res.status(500).json({error:true, message:err.message});
    }
}

const getCategoryByParent = async(req,res,next) => {
    try {
        const id = String(req.params.id);
        let result = await Category.find({parentId: id})
        return res.status(201).json({error:false, message:result});
    } catch(err){
        return res.status(500).json({error:true, message:err.message});
    }
}

const getCategoryById = async(req, res) => {
    try {

        const id = String(req.params.id);
        let result = await Category.findOne({_id: id});

        // for case recent category
        if(req.session.user && id === req.session.user._id) {
            result = {_id: id, name: process.env.NAME_CATEGORY_RECENT, description:process.env.DES_CATEGORY_RECENT};
        }
        
        return res.status(201).json({error:false, data:result});
    } catch(err){
        return res.status(500).json({error:true, message:err.message});
    }
}

const getCategoryByName = async(req, res) => {
    try {

        const id = String(req.params.id);

        let result = await Category.findOne({name: id});

        // for case recent category
        if(id === process.env.NAME_CATEGORY_RECENT) {
            result = {_id: id, name: process.env.NAME_CATEGORY_RECENT, description:process.env.DES_CATEGORY_RECENT};
        }

        return res.status(201).json({error:false, data:result});
    } catch(err){
        return res.status(500).json({error:true, message:err.message});
    }
}

const upload = async(req,res,next) => {
    try {
        
        let uploadFile = req.files.file;
        const id = req.body.id;

        const dir = path.join(__dirname, '../../public/images/category/');

        if (!fs.existsSync(dir)){
            await fs.mkdirSync(dir);
        }

        await mvFile(uploadFile, dir+uploadFile.name);

        await Category.findOneAndUpdate({_id:id}, { $set: { banner: 'category/'+uploadFile.name}});
        
        return res.status(200).json({
            error: false,
            message: 'succes',
            file: `${uploadFile.name}`,
        });
    } catch(err) {
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

const updateCategory = async (req, res, next) => {
    try {
        const { _id } = req.body;

        const updateContent = await Category.findOneAndUpdate({_id:_id}, { $set: req.body}, null);

        return res.status(200).json({error: false, message: _id, content: updateContent})

    } catch(err){
        return res.status(500).json({error:true ,message:err.message});
    }
}
exports.getCategoryByid = getCategoryById;
exports.getAllCategory = getAllCategory;
exports.createCategory = createCategory;
exports.getCategoryByParent = getCategoryByParent;
exports.getAllCategoryAndContent = getAllCategoryAndContent;
exports.getCategoryByName = getCategoryByName;
exports.getAllCategoryAdmin = getAllCategoryAdmin;
exports.upload = upload
exports.updateCategory = updateCategory;