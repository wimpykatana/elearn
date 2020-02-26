const Watched = require('../modules/course/model_watched');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const moment = require('moment');
const lt = new Date()
const gt = new Date(moment().subtract(process.env.GET_DATE_POPU_VIDE_FROM_MONTH, 'month').add(1, 'day').format("YYYY-MM-DD HH:mm"));

const getWatching = (type) => {
    const limit = (type === 'landing') ? parseInt(process.env.LIMIT_CONTENT_CATEGORY) : parseInt(process.env.LIMIT_SHOW_POPULARE_VIDEO);
    
    return new Promise((resolve, reject) => {
        Watched.aggregate([{
                $match: {createdAt: {$gt: gt, $lt: lt}}
            }, { 
                $group: { 
                    _id: "$courseId",
                    count: { 
                        $sum: 1 
                    }
                }
            }, {
                $lookup: {
                    from: "contens",
                    localField: "_id",
                    foreignField: "_id",
                    as: "course"
                }
            }, {
                $project: {
                    "course.video":0,
                    "course.watched":0
                }
            }, {
                $sort: {
                    count:-1
                }
            }, {
                $limit: limit
            }
        ]).then((data) => {
            let arr = [];

            Promise.all(
                data.map(async(item) => {
                    if(item.course.length > 0) {
                        const obj = item.course[0];
                        obj.count = item.count;
        
                        arr.push(obj)
                    }
                    
                })
            ).then(() => {
                resolve(arr);
            }).catch((err) => {
                reject(err);
            });
        }).catch((err) => {
            reject(err);
        });

        
    })
}

const getWatchingPaging = (a, b) => {
    const page = parseInt(a);
    const perPage = parseInt(b);

    return new Promise((resolve, reject) => {
        Watched.aggregate([{
            $match: {createdAt: {$gt: gt, $lt: lt}}
            }, { 
                $group: { 
                    _id: {
                        courseId: "$courseId"
                    },
                    count: { 
                        $sum: 1 
                    }
                }
            }, {
                $lookup: {
                    from: "contens",
                    localField: "_id.courseId",
                    foreignField: "_id",
                    as: "course"
                }
            }, {
                $project: {
                    "course.video":0
                }
            }, {
                $sort: {
                    count:-1
                }
            }, {
                $skip: (perPage * page) - perPage
            }, {
                $limit: perPage
            }
        ]).then((data) => {
            let arr = [];

            Promise.all(
                data.map(async(item) => {
                    const obj = item.course[0];
                    obj.count = item.count;
    
                    arr.push(obj)
                })
            ).then(() => {
                resolve(arr);
            })
        }).catch((err) => {
            reject(err);
        });
    })
}

const getWatchingByUser = (userId, type) => {
    return new Promise((resolve,reject) => {
        const limit = (type === 'home') ? parseInt(process.env.LIMIT_CONTENT_CATEGORY) : parseInt(process.env.LIMIT_SHOW_RECENT_VIDEO);

        Watched.aggregate([{
            $match: {
                "userId": ObjectId(userId)
            }
        }, {
            $group: {
                _id: {
                    courseId: "$courseId"
                }
            }
        }, {
            $lookup: {
                from: "contens",
                localField: "_id.courseId",
                foreignField: "_id",
                as: "course"
            }
        }, {
            $limit: limit
        }]).then(async (data) => {
            const arr = []
            await Promise.all(
                data.map((item,index) => {
                    arr.push(item.course[0])
                })
            )
           resolve(arr);
        }).catch((err) => {
            reject(err)
        });
    })
}

const getWatchingByUserPaging = (userId, page, perPage) => {
    return new Promise((resolve,reject) => {
        Watched.aggregate([{
            $match: {
                "userId": ObjectId(userId)
            }
        }, {
            $group: {
                _id: {
                    courseId: "$courseId"
                }
            }
        }, {
            $lookup: {
                from: "contens",
                localField: "_id.courseId",
                foreignField: "_id",
                as: "course"
            }
        }, {
            $skip: (perPage * page) - perPage
        }, {
            $limit: perPage
        }]).then(async(data) => {
            const arr = []
            await Promise.all(
                data.map((item,index) => {
                    arr.push(item.course[0])
                })
            )
           return resolve(arr);
        }).catch((err) => {
            reject(err)
        });

        // Watched.find({userId:userId}).populate("courseId").sort("-createdAt").skip((perPage * page) - perPage).limit(perPage).then(async(result) => {
        //     const arr = [];

        //     await Promise.all(
        //         result.map((item) => {
        //             arr.push(item.courseId);
        //         })
        //     );

        //     //ignore duplicate data
        //     const arr2 = [...new Set(arr)];

        //     resolve(arr2);
        // }).catch((err) => {
        //     reject(err);
        // }); ;
    })
}

exports.getWatchingPaging = getWatchingPaging;
exports.getWatching = getWatching;
exports.getWatchingByUser = getWatchingByUser;
exports.getWatchingByUserPaging = getWatchingByUserPaging;