module.exports = (app) => {
    const pathExt = require("../../config").pathExt+"/hotels";
    const hotels = require("../controllers/hotel.controller.js");

    app.post(pathExt, hotels.post);
    app.get(pathExt+"/:uid", hotels.get);
    app.put(pathExt+"/:uid", hotels.put);
    app.delete(pathExt+"/:uid", hotels.delete);
};