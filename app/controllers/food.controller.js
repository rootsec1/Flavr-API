const Food = require("../models/food.model.js");

exports.post = (req,res)=>{
    if(req.body.name && req.body.cost && req.body.category && req.body.hotel) {
        const food = new Food({
            name: req.body.name,
            cost: req.body.cost,
            category: req.body.category,
            hotel: req.body.hotel,
            image: req.body.image? req.body.image : ""
        });
        food.save((err,data)=>sendData(err,data,req,res));
    } else sendData("Missing POST body params", null, req, res);
};

exports.get = (req,res)=>{
    if(req.params.id) Food.findById(req.params.id, (err,data)=>sendData(err,data,req,res));
    else if(req.query.uid) Food.find({ uid: hotel.uid }, (err,data)=>sendData(err,data,req,res));
    else sendData("Missing Param ID or Query Param UID", null, req, res);
};

exports.put = (req,res)=>{
    Food.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (err,data)=>sendData(err,data,req,res));
};

exports.delete = (req,res)=>{
    Food.findByIdAndRemove(req.params.id, (err,data)=>sendData(err,data,req,res));
};

function sendData(err, data, req, res) {
    console.log("["+req.method+"] "+req.url);
    if(err) {
        res.status(500).json({ err });
        console.log("[!USER_CONTROLLER] "+err);
    } else res.status(200).json(data);
}