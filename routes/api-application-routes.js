var db = require("../models");

module.exports = function (app) {

    app.get("/", (req, res) => {
        res.render("index");
    })

    // Get All Applications where the AJAX request includes the userId in the body {userId: ##}
    app.get("/api/user/:id/application/all", (req, res) => {
        db.Application.findAll({
            where: { UserId: req.params.id },
            include: {
                model: db.Company,
                model: db.Contact,
                model: db.Source,
                model: db.Stage
            }
            // attributes: ["ApplicationId"] 
        }).then(applications => {
            res.json(applications);
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });

    });

    // Get Unique Application
    app.get("/api/application/:id", (req, res) => {
        db.Application.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: db.Company,
                model: db.Contact,
                model: db.Source,
                model: db.Stage
            }
        }).then(application => {
            res.json(application);
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });

    });

    // Create Application
    app.post("/api/application", (req, res) => {
        db.Application.create(req.body, {
        }).then(application => {
            res.send(`Application for ${application.title}, has been created`)
        }).catch(err => {
            console.log(err);
            res.send(`Application for ${application.title}, was NOT created`)
        });
    });

    // Update Application
    app.put("/api/user/:userId/application/:applicationId", (req, res) => {
        // check user authentication userId -> 403 if not
        db.Application.update({
            where: {
                id: req.params.applicationId
            },
        }).then(() => {
            res.json("Completed");
        }).catch(err => {
            console.log(err);
            res.send("Failed to update");
        });
    });

    // Delete Application
    app.delete("/api/user/:userId/application/:applicationId", (req, res) => {
        db.Application.destroy({
            where: {
                id: req.params.applicationId
            },
        }).then(() => {
            res.send(true);
        }).catch(err => {
            console.log(err);
            res.send(false);
        });
    });

}