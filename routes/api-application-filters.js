var db = require("../models");

module.exports = function (app) {

    // Get All Apps with Title
    app.get("/api/user/:userId/application/filter/title/:title", (req, res) => {
        db.Application.findAll({
            where: {userId: req.params.userId, title: req.params.title},
            include: {
                model: db.Company,
                model: db.Contact,
                model: db.Source,
                model: db.Stage
            },
        }).then(applications => {
            res.json(applications);
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });

    });

    // Get All Apps with ZipCode
    app.get("/api/user/:userId/application/filter/zipCode/:zipCode", (req, res) => {
        db.Application.findAll({
            where: {userId: req.params.userId, zipCode: req.params.zipCode},
            include: {
                model: db.Company,
                model: db.Contact,
                model: db.Source,
                model: db.Stage
            },
        }).then(applications => {
            res.json(applications);
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });

    });

    // Get All Apps with Rating
    app.get("/api/user/:userId/application/filter/rating/:rating", (req, res) => {
        db.Application.findAll({
            where: {userId: req.params.userId, rating: req.params.rating},
            include: {
                model: db.Company,
                model: db.Contact,
                model: db.Source,
                model: db.Stage
            },
        }).then(applications => {
            res.json(applications);
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });

    });
}