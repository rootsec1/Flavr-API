const Hotel = require("../models/hotel.model.js");
const Food = require("../models/food.model.js");

exports.post = (req,res) => {
    if(req.body.uid && req.body.name && req.body.email && req.body.phone && req.body.latitude && req.body.longitude) {
        Hotel.find({ uid: req.body.uid }, (err,data)=>{
            if(data.length==0 && !err) {
                const hotel = new Hotel({
                    uid: req.body.uid,
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    latitude: req.body.latitude,
                    longitude: req.body.longitude
                });
                hotel.save((err,data)=>sendData(err,data));
            } else sendData("Hospital UID already exists", null, req, res);
        }).limit(1);
    } else sendData("Missing POST body params", null, req, res);
};

exports.get = (req,res) => {
    Hotel.findOne({ uid: req.params.uid }, (err,data)=>sendData(err,data,req,res));
};

exports.put = (req,res) => {
    if(req.body) { 
        Hotel.findOneAndUpdate({ uid: req.params.uid }, { $set: req.body }, { new: true }, (err,data)=>{
            if(data && !err) Food.update({ "hotel.uid": req.params.uid }, { $set: { hotel: data } }, { new: true }, ()=>sendData(err,data,req,res));
            else sendData("Hotel with provided UID does not exist", null, req, res);
        });
    } else sendData("Missing PUT body params.", null, req, res);
};

exports.delete = (req,res) => {
    Hotel.findOneAndRemove({ uid: req.params.uid }, (err,data)=>{
        if(data && !err) Food.deleteMany({ "hotel.uid": req.params.uid }, ()=>sendData(err,data,req,res));
        else sendData("Hotel with provided UID does not exist", null, req, res);
    });
};

function sendData(err, data, req, res) {
    console.log("["+req.method+"] "+req.url);
    if(err) {
        res.status(500).json({ err });
        console.log("[!USER_CONTROLLER] "+err);
    } else res.status(200).json(data);
}