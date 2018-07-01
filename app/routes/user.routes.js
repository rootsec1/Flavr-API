module.exports = (app) => {
    const pathExt = require("../../config").pathExt+"/users";
    const users = require("../controllers/user.controller.js");

    app.post(pathExt, users.post);
    app.get(pathExt, users.get);
    app.get(pathExt+"/:uid", users.get);
    app.put(pathExt+"/:uid", users.put);
    app.delete(pathExt+"/:uid", users.delete);
};