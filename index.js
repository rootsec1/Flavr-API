const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config");

mongoose.Promise = global.Promise;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req,res)=>{
    res.status(200).json({ message: "All API requests should be pointed at /api/v1" });
});

require("./app/routes/user.routes.js")(app);
require("./app/routes/hotel.routes.js")(app);
require("./app/routes/food.routes.js")(app);
//require("./app/routes/order.routes.js")(app);
app.listen(config.port, ()=>{
    console.log("[SERVER] Listening on port "+config.port);
    mongoose.connect(config.dbUrl)
    .then(() => console.log("[DB] Hooked to DB Success"))
    .catch(err => {
        console.log("[!DB] Could not connect to database. Exiting..");
        process.exit();
    });
});