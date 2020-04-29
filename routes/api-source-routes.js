var db = require("../models");

module.exports = function (app) {
    
    // Get All Possible Sources from an Application
    app.get("/api/application/:applicationId/source/all", (req, res) => {
        db.Source.findAll({
            where: {
                ApplicationId: req.params.applicationId
            }
        }).then(sources => {
            res.json(sources);
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });    
    });

    // Get Single Source from an Application
    app.get("/api/application/:applicationId/source/:sourceId", (req, res) => {
        db.Source.findOne({
            where: {
                ApplicationId: req.params.applicationId,
                id: req.params.sourceId
            },
        }).then(source => {
            res.json(source);
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });
            
    });

    // Get All Source - Source, linkToPosting, JobID, ApplyType, ResumeVersion
    //  * Need to add by User
     app.get("/api/source/all/:field", (req, res) => {
        db.Source.findAll({
            attributes: [req.params.field]
        }).then(sources => {
            res.json(sources);
            console.log(sources);
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });
    });

    // Create New Source
    // * Need to add AppID
    app.post("/api/source/new", (req, res) => {
        db.Source.create(req.body, {
        }).then(source => {
            res.send(`Source, ${source.source}, has been created`)
        }).catch(err => {
            console.log(err);
            res.send(`Source, ${source.source}, was NOT created`)
        });
    });

     // Update Source
     app.put("/api/source/:sourceId", (req, res) => {
        db.Source.update(req.body, {
            where: {
                id: req.params.sourceId
            },
        }).then(() => {
            res.json("Completed");
        }).catch(err => {
            console.log(err);
            res.send("Failed to update");
        });  
    });

    // Delete Source
    app.delete("/api/source/:sourceId", (req, res) => {
        db.Source.destroy({
            where: {
                id: req.params.sourceId
            },
        }).then((rowsDeleted) => {
            rowsDeleted ? res.send(true) : res.send(false);
        }).catch(err => {
            console.log(err);
            res.send(false);
        });
    });

}