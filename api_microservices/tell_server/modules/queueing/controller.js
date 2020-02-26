const Queueing = require('./model');

const ffmpegStatus = async(req, res) => {
    try {
        const queueing = await Queueing.find({name: 'ffmpeg'});

        if(queueing.length > 2) {
            throw {message: "server busy, please try again few minutes"};
        }

        return res.status(200).json({error:false, message: "server ready"});
    } catch (err) {
        return res.status(500).json({error:true, message:err.message});
    }
}


exports.ffmpegStatus = ffmpegStatus;