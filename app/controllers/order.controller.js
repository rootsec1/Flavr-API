const Order = require("../models/order.model.js");
const User = require("../models/user.model.js");
const firebase = require("firebase-admin");

exports.post = (req,res)=>{
    if(req.body.latitude && req.body.longitude && req.body.user && req.body.foodList) {
        User.findById(req.body.user, (errUser,dataUser)=>{
            if(dataUser && !errUser) {
                const order = new Order({
                    uid: req.body.uid,  //Hotel UID
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    user: dataUser,
                    foodList: req.body.foodList
                });
                order.save((err,data)=>{
                    const databaseCountReference = firebase.database().ref("hotels/"+req.body.uid+"/count");
                    databaseCountReference.once("value", (snapshot)=>{
                        const currentCount = snapshot.val();
                        databaseCountReference.set(currentCount+1, ()=>{
                            sendData(err,data,req,res);
                        });
                    });
                });
            } else sendData("Invalid client", null, req, res);
        });
    }
};

exports.get = (req,res)=>{
    if(req.query.uid) {
        Order.find({ uid: req.query.uid }, (err,data)=>{
            sendData(err,data,req,res);
        });
    } else if(req.params.id) {
        Order.findById(req.params.id, (err,data)=>{
            sendData(err,data,req,res);
        });
    }
};

exports.delete = (req,res)=>{
    Order.findByIdAndRemove(req.params.id, (err,data)=>{
        if (data) { 
            const databaseCountReference = firebase.database().ref("hotels/"+data.uid+"/count");
            databaseCountReference.once("value", (snapshot)=>{
                const currentCount = snapshot.val();
                databaseCountReference.set((currentCount<=0?0:currentCount-1), ()=>{
                    sendData(err,data,req,res);
                });
            });
        } else sendData("Invalid ID", null, req, res);
    });
};

function sendData(err, data, req, res) {
    console.log("["+req.method+"] "+req.url);
    if(err) {
        res.status(500).json({ err });
        console.log("[!ORDER_CONTROLLER] "+err);
    } else res.status(200).json(data);
}