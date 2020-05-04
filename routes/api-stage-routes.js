var db = require("../models");
var renderStage = require("./api-stage-render.js");

module.exports = function (app) {
 
    // Get All Stages for Application
    app.get("/api/application/:applicationId/stage/all", (req, res) => {
        db.Stage.findAll({
            where: {
                ApplicationId: req.params.applicationId
            }
        }).then(stages => {
            // Add partial ad third argument
            renderStage(stages, res);
        }).catch(err => {
            console.log(err);
            res.send(false);
        });  
    });

    // Get One Stage for Application
    app.get("/api/stage/:stageId", (req, res) => {
        db.Stage.findOne({
            where: {
                id: req.params.stageId
            }
        }).then(stage => {
            var x = {layout: false,
                dataValues: {
                    id: stage.id,
                    currentStage: stage.currentStage,
                    dateCurrentStage: stage.dateCurrentStage,
                    nextStep: stage.nextStep,
                    notes: stage.notes
                }
            }
            res.render("partials/stages/stage-block", x);
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });
    });

    app.get("/api/stage/json/:stageId", (req, res) => {
        db.Stage.findOne({
            where: {
                // ApplicationId: req.params.applicationId,
                id: req.params.stageId
            }
        }).then(stage => {
            res.json(stage)
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });
    });

    // Get All Stage - Applied, Behavioral Interview, etc.
    //  * Need to add by User
    app.get("/api/stage/all/:field", (req, res) => {
        db.Stage.findAll({
            attributes: [req.params.field]
        }).then(fieldList => {
            const fieldArray = fieldList.map(app => Object.values(app.dataValues))

            var hbsObj = {
                layout: false,
                fieldList: fieldArray
            }
            res.render("partials/commonUI/filter-block", hbsObj);
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });
    });

    // Create New Stage
    app.post("/api/stage/new", (req, res) => {
        // ApplicationId sent from client
        db.Stage.create(req.body, {
            where: {
                ApplicationId: req.body.applicationId
            }
        }).then(stage => {
            var x = {layout: false,
                dataValues: {
                    id: stage.id,
                    currentStage: stage.currentStage,
                    dateCurrentStage: stage.dateCurrentStage,
                    nextStep: stage.nextStep,
                    notes: stage.notes
                }
            }
            // Add Partial as third argument
            res.render("partials/stages/stage-block", x);
        }).catch(err => {
            console.log(err);
            res.send(`Stage, ${stage.currentStage}, was NOT created`)
        });
    });

     // Update Stage
     app.put("/api/stage/:stageId", (req, res) => {
        db.Stage.update(req.body, {
            where: {
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
    app.delete("/api/stage/:stageId", (req, res) => {
        db.Stage.destroy({
            where: {
                id: req.params.stageId
            },
        }).then((rowsDeleted) => {
            rowsDeleted ? res.send(true) : res.send(false);
        }).catch(err => {
            console.log(err);
            res.send(false);
        });
    });
}