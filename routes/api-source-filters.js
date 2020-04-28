var db = require("../models");

module.exports = function (app) {
    

    // Filter Source on Source - Linkedn, GitHub, etc.
    app.get("/api/user/:userId/source/filter/sourceType/:source", (req, res) => {
        db.Source.findAll({
            where: {
                userId: req.params.userId, source: req.params.source
            },
        }).then(sources => {
            res.json(sources);
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });

    });

    // Filter All Applications with resumeVersion
    app.get("/api/user/:userId/source/filter/resumeVersion/:resumeVersion", (req, res) => {
        db.Source.findAll({
            where: {
                userId: req.params.userId, resumeVersion: req.params.resumeVersion
            },
        }).then(sources => {
            res.json(sources);
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });

    });

    
}