var db = require("../models");

module.exports = function (app) {

    // Get All Applications
    app.get("/api/application", (req, res) => {
        db.Application.findAll({
            include: {
                
            }
        }).then(applications => {
            res.json(applications)
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
                model: db.Contact,
                model: db.Source,
                model: db.Stage
            }
        }).then(application => {
            res.json(application)
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });
            
    });

     // Get Unique Application
     app.get("/api/application/:id/stages", (req, res) => {
        db.Application.findAll({
            where: {
                id: req.params.id
            },
            include: {
                model: db.stage,
                // attributes: ["name"]
            }
        }).then(stages => {
            res.json(stages)
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
    app.put("/api/application/:id", (req, res) => {
        db.Application.update({
            where: {
                id: req.params.id
            },
        }).then(() => {
            res.json("Completed");
        }).catch(err => {
            console.log(err);
            res.send("Failed to update");
        });
            
    });

    // Delete Application
    app.delete("/api/application/:id", (req, res) => {
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