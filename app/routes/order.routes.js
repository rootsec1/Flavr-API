module.exports = (app) => {
    const pathExt = require("../../config").pathExt+"/orders";
    const orders = require("../controllers/order.controller.js");

    app.post(pathExt, orders.post);
    app.get(pathExt+"/:id", orders.get);
    app.delete(pathExt+"/:id", orders.delete);
};