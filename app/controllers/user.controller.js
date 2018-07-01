const User = require("../models/user.model.js");

exports.post = (req,res)=>{
    if(req.body.uid && req.body.name && req.body.email && req.body.phone) {
        const user = new User({
            uid: req.body.uid,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        });
        user.save((err,data)=>sendData(err,data,req,res));
    } else sendData("Missing POST body params", null, req, res);
};

exports.get = (req,res)=>{
    User.findOne({ uid: req.params.uid }, (err,data)=>sendData(err,data,req,res));
};

exports.put = (req,res)=>{
    User.findOneAndUpdate({ uid: req.params.uid }, { $set: req.body }, { new: true }, (err,data)=>sendData(err,data,req,res));
};

exports.delete = (req,res)=>{
    User.findOneAndRemove({ uid: req.params.uid }, (err,data)=>sendData(err,data,req,res));
};

function sendData(err, data, req, res) {
    console.log("["+req.method+"] "+req.url);
    if(err) {
        res.status(500).json({ err });
        console.log("[!USER_CONTROLLER] "+err);
    } else res.status(200).json(data);
}