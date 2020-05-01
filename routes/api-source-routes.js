var db = require("../models");


function renderSource(sources, res, partial) {
    if (partial === undefined) {
        return res.json(sources);
    }
    var newSources = sources;
    // If a single object add to an array
    if (!Array.isArray(sources)) {
        newContacts = [sources];
    }
    var arrOfObjs = newSources.map(({dataValues: {id, source, linkToPosting, JobID, applyType, resumeVersion}}) => ({
        id,
        source,
        linkToPosting,
        JobID,
        applyType,
        resumeVersion
    }));

    // console.log(arrOfObjs)
    var x = {
        layout: false,
        applications: arrOfObjs
    }

    // Partial: "partials/jobs/application-block"
    res.render(partial, x);
}


module.exports = function (app) {
    
    // Get All Possible Sources from an Application
    app.get("/api/application/:applicationId/source/all", (req, res) => {
        db.Source.findAll({
            where: {
                ApplicationId: req.params.applicationId
            }
        }).then(sources => {
            // Add partial as third argument
            renderSource(sources, res);
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
            // Add partial as third argument
            renderSource(source, res);
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

    // Create New Source
    app.post("/api/source/new", (req, res) => {
        // ApplicationId sent from client
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