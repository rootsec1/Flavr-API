module.exports = (app) => {
    const pathExt = require("../../config").pathExt+"/food";
    const food = require("../controllers/food.controller.js");

    app.post(pathExt, food.post);
    app.get(pathExt+"/:id", food.get);
    app.put(pathExt+"/:id", food.put);
    app.delete(pathExt+"/:id", food.delete);
};