var db = require("../models");

module.exports = function (app) {
    
    app.get("/", (req, res) => {
        res.render("index");
    })

    // Get All Applications where the AJAX request includes the userId in the body {userId: ##}
    app.get("/api/user/:id/application/all", (req, res) => {
        db.User.findOne({
            where: {id: req.params.id},
            include: {
                model: db.Company,
                model: db.Contact,
                model: db.Source,
                model: db.Stage
            },
            attributes: ["ApplicationId"] // specify cols to send back (foreignkey)
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
            res.render("index", application);
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });
            
    });

     // Get Unique Application Stages
     app.get("/api/application/:id/stages", (req, res) => {
        db.Stages.findAll({
            where: {
                ApplicationId: req.params.id
            },
        }).then(stages => {
            res.render("index", stages);
        }).catch(err => {
            console.log(err);
            res.send(false);
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
                id: req.params.id
            },
        }).then(() => {
            res.send(true);
        }).catch(err => {
            console.log(err);
            res.send(false);
        });
    });
            
}