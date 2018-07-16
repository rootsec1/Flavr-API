const Order = require("../models/order.model.js");
const User = require("../models/user.model.js");
const firebase = require("firebase-admin");

exports.post = (req,res)=>{
    if(req.body.latitude && req.body.longitude && req.body.user && req.body.foodList) {
        User.findById(req.body.user, (errUser,dataUser)=>{
            if(dataUser && !errUser) {
                const order = new Order({
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    user: dataUser,
                    foodList: req.body.foodList
                });
                order.save((err,data)=>{
                    
                });
            }
        });
    }
};

function sendData(err, data, req, res) {
    console.log("["+req.method+"] "+req.url);
    if(err) {
        res.status(500).json({ err });
        console.log("[!USER_CONTROLLER] "+err);
    } else res.status(200).json(data);
}