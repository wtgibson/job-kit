var db = require("../models");

module.exports = function (app) {

     // send default page to all routes that are undefined
    app.get("/profile", (req, res) => {
        res.render("profile");
    });

    app.get("/jobs", (req, res) => {
        $.ajax()
    });

    app.get("/applications", (req, res) => {
        res.render("applications");
    });

}