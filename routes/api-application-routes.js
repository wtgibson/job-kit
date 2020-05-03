var db = require("../models");
var renderApps = require("./api-application-render.js");


module.exports = function (app) {

    // Get All Applications
    app.get("/api/user/:id/application/all", (req, res) => {
        db.Application.findAll({
            where: {
                UserId: req.params.id
            },
            include: [
                { model: db.Company },
                { model: db.Contact },
                { model: db.Stage },
                { model: db.Source },
            ]
        }).then(applications => {
            renderApps(applications, res, "partials/jobs/application-block");
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });

    });

    // Get Unique Application
    app.get("/api/application/:applicationId", (req, res) => {
        db.Application.findOne({
            where: {
                id: req.params.applicationId
            },
            include: [
                { model: db.Company },
                { model: db.Contact },
                { model: db.Stage },
                { model: db.Source },
            ]
        }).then(application => {
            // Change partial to use different block
            res.json(application)
            // renderApps(application, res, "partials/jobs/details-block");
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });

    });

    // Get All Application - Title, Type, Industry,  Zipcode, Rating
    app.get("/api/user/:userId/application/:field", (req, res) => {
        db.Application.findAll({
            where: {
                UserId: req.params.userId
            },
            attributes: [req.params.field]
        }).then(fieldList => {
            // Map field list
            const fieldArr = fieldList.map(app => Object.values(app.dataValues));
            let nonNestedArray = []
            fieldArr.forEach((element) => {
                nonNestedArray.push(element[0])
            })
            const uniqueSet = new Set(nonNestedArray);
            const arraySet = [...uniqueSet];

            
            var hbsObj = {
                layout: false,
                fieldList: arraySet
            }

            if (req.params.field === "rating") {
    
                res.render("partials/commonUI/filter-emoji-block", hbsObj);
            }
            else {
                
                res.render("partials/commonUI/filter-block", hbsObj);
            }

        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });
    });

    // Get All Application - Source, ResumeVersion 
    app.get("/api/user/:userId/application/join/source/:field", (req, res) => {
        db.Application.findAll({
            where: {
                UserId: req.params.userId
            },
            include: {
                model: db.Source,
                as: "Sources",
                required: true
            }
        }).then(fieldList => {
            let field = req.params.field;
            let sourceArray = [];
            let fieldArray = [];

            fieldList.forEach(application => {
                sourceArray.push(application.Sources);
            });

            sourceArray.forEach(source => {
                if (field === "source") {
                    fieldArray.push(source[0].dataValues.source)
                }
                else if (field === "resumeVersion") {
                    fieldArray.push(source[0].dataValues.resumeVersion)
                }
                else if (field === "applyType") {
                    fieldArray.push(source[0].dataValues.applyType)
                }
            });
        
            const uniqueSet = new Set(fieldArray);
            const arraySet = [...uniqueSet];

            var hbsObj = {
                layout: false,
                fieldList: arraySet
            }

            res.render("partials/commonUI/filter-block", hbsObj);

        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });
    });

    // Get All Application - CurrentStage
    app.get("/api/user/:userId/application/join/stage/:field", (req, res) => {
        db.Application.findAll({
            where: {
                UserId: req.params.userId
            },
            include: {
                model: db.Stage,
                as: "Stages",
                required: true
            }
        }).then(fieldList => {
            let stageArray = [];
            let fieldArray = [];

            fieldList.forEach(application => {
                stageArray.push(application.Stages);
            });

            stageArray.forEach(stage => {
                fieldArray.push(stage[0].dataValues.currentStage);
            });
        
            const uniqueSet = new Set(fieldArray);
            const arraySet = [...uniqueSet];

            var hbsObj = {
                layout: false,
                fieldList: arraySet
            }

            res.render("partials/commonUI/filter-block", hbsObj);

        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });
    });

    // Create Application
    app.post("/api/application", (req, res) => {
        db.Application.create(req.body, {
        }).then(application => {
            res.json(application.dataValues.id)
            // res.send(`Application for ${application.dataValues.title}, has been created`)
        }).catch(err => {
            console.log(err);
            res.send(`Application for ${application.dataValues.title}, was NOT created`)
        });
    });

    // Update Application
    app.put("/api/application/:applicationId", (req, res) => {
        // check user authentication userId -> 403 if not
        db.Application.update(req.body, {
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
    app.delete("/api/application/:applicationId", (req, res) => {
        db.Application.destroy({
            where: {
                id: req.params.applicationId
            },
        }).then((rowsDeleted) => {
            // Check that rows were actually deleted
            rowsDeleted ? res.send(true) : res.send(false);
        }).catch(err => {
            console.log(err);
            res.send(false);
        });
    });

}