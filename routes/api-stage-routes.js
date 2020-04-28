var db = require("../models");

module.exports = function (app) {
 
    // Get All Stages for Application
    app.get("/api/application/:applicationId/stages", (req, res) => {
        db.Stage.findAll({
            where: {
                ApplicationId: req.params.applicationId
            },
        }).then(stages => {
            res.json(stages);
        }).catch(err => {
            console.log(err);
            res.send(false);
        });  
    });

    // Get One Stage for Application
    app.get("/api/application/:applicationId/stage/:stageId", (req, res) => {
        db.Stage.findOne({
            where: {
                ApplicationId: req.params.applicationId,
                id: req.params.stageId
            }
        }).then(application => {
            res.json(application);
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });
    });

    // Create New Stage
    app.post("/api/application/:applicationId/stage", (req, res) => {
        db.Stage.create(req.body, {
            where: {
                ApplicationId: req.params.applicationId
            }
        }).then(stage => {
            res.send(`Stage, ${stage.currentStage}, has been created`)
        }).catch(err => {
            console.log(err);
            res.send(`Stage, ${stage.currentStage}, was NOT created`)
        });
    });

     // Update Stage
     app.put("/api/application/:applicationId/stage/:stageId", (req, res) => {
        db.Stage.update({
            where: {
                ApplicationId: req.params.applicationId,
                id: req.params.stageId
            },
        }).then(() => {
            res.json("Completed");
        }).catch(err => {
            console.log(err);
            res.send("Failed to update");
        });  
    });

    // Delete Stage
    app.delete("/api/application/:applicationId/stage/:stageId", (req, res) => {
        db.Stage.destroy({
            where: {
                ApplicationId: req.params.applicationId,
                id: req.params.stageId
            },
        }).then(() => {
            res.send(true);
        }).catch(err => {
            console.log(err);
            res.send(false);
        });
    });
}