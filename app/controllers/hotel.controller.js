const Hotel = require("../models/hotel.model.js");

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
    Hotel.findOneAndUpdate({ uid: req.params.uid }, { $set: req.body }, { new: true }, (err,data)=>sendData(err,data,req,res));
    //TODO: Query Food Models and update the corresponding hotels
};

exports.delete = (req,res) => {
    Hotel.findOneAndRemove({ uid: req.params.uid }, (err,data)=>sendData(err,data,req,res));
};

function sendData(err, data, req, res) {
    console.log("["+req.method+"] "+req.url);
    if(err) {
        res.status(500).json({ err });
        console.log("[!USER_CONTROLLER] "+err);
    } else res.status(200).json(data);
}