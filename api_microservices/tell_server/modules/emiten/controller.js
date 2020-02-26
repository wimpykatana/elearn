const Emiten = require('./model');

const search = async(req, res) => {
    try {
        const emiten = await Emiten.find({$text: {$search: req.body.text} }).sort("name");
        return res.status(200).json({error:false, message: "Success", total: emiten.length, data:emiten});
    } catch (err) {
        return res.status(500).json({error:true, message:err.message});
    }
}

const list = async(req, res) => {
    try {
        const emiten = await Emiten.find({}).sort("name");
        return res.status(200).json({error:false, message: "Success", total: emiten.length, data:emiten});
    } catch (err) {
        return res.status(500).json({error:true, message:err.message});
    }
}

exports.list = list;
exports.search = search;