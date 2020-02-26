const shortid = require('shortid');
const dbConfig = require('./db/db');
const course = require('./modules/course/controller');

dbConfig.con();

//course.getAllContentAndUpdate();
// course.getAllContent();
course.ratingsChange();


 
// var i = 1000;
// while (i--) {
//     console.log(shortid.generate());
// }