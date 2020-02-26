const Category = require('./model');
const Courses = require('../course/model');

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

//get all content
const getAllCategoryAndContent = async(req, res) => {
    try {
        let result = await Category.find({});
        const array = [];

        await Promise.all(
            result.map(async (item) => {
                if(JSON.stringify(item._id) === '"'+process.env.ID_CATEGORY_PUBLIC_COMPANIES+'"') {
                    data = await Courses.find({active: true, "categoryId": item._id}).sort("contributorName").limit(parseInt(process.env.LIMIT_CONTENT_CATEGORY))
                } else if (JSON.stringify(item._id) === '"'+process.env.ID_CATEGORY_LATES_VIDEOS+'"'){
                    data = await Courses.find({active: true}).sort("-uploadDate").limit(parseInt(process.env.LIMIT_CONTENT_CATEGORY))
                } else {
                    data = await Courses.find({active: true, "categoryId": item._id}).sort("-_id").limit(parseInt(process.env.LIMIT_CONTENT_CATEGORY))
                }

                array.push({
                    _id:item._id,
                    name: item.name,
                    parentId: item.parentId,
                    createdAt: item.createdAt,
                    description: item.description,
                    courses: data
                });
            })
        );
        
        await array.sort(function(a, b){return a.createdAt - b.createdAt});

        return res.status(200).json({error:false, contents: array});
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
        
        return res.status(201).json({error:false, data:result});
    } catch(err){
        return res.status(500).json({error:true, message:err.message});
    }
}

exports.getCategoryByid = getCategoryById;
exports.getAllCategory = getAllCategory;
exports.createCategory = createCategory;
exports.getCategoryByParent = getCategoryByParent;
exports.getAllCategoryAndContent = getAllCategoryAndContent;