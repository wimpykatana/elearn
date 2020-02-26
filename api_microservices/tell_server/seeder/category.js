const categoryModel = require('../modules/category/model')
const seederModel = require('./model');
const courseModel = require('../modules/course/model');

module.exports = async function(){
    try {
        const seeder = await seederModel.findOne({name: 'category'});

        if(!seeder) {
            const data =  [{
                name: 'Stock Analysis',
                parentId: null,
                createdAt: new Date(),
            }, {
                name: 'Public Co. Profile',
                parentId: null,
                createdAt: new Date(),
            }];

            await categoryModel.create(data);

            const category  = await categoryModel.findOne({name:'Stock Analysis'})
            const category2  = await categoryModel.findOne({name:'Public Co. Profile'})

            await courseModel.update({category:2}, {categoryId:category._id}, {multi: true});
            await courseModel.update({category:3}, {categoryId:category2._id}, {multi: true});

            await seederModel.create({name: 'category', createdAt: new Date()});
        }
        

    } catch (err) {
        console.log ('seeder category error => ', err)
    }
}