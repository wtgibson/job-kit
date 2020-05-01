var db = require("../models");

function renderApplications(applications, res, partial) {
    if (partial === undefined) {
        return res.json(applications);
    }
    var newApplications = applications;
    // If a single object add to an array
    if (!Array.isArray(applications)) {
        newApplications = [applications];
    }
    var arrOfObjs = newApplications.map(element => ({
        id: element.dataValues.id,
        title: element.dataValues.title,
        type: element.dataValues.type,
        industry: element.dataValues.industry,
        zipCode: element.dataValues.zipCode,
        description: element.dataValues.description,
        salaryRange: element.dataValues.salaryRange,
        dateApplied: element.dataValues.dateApplied,
        rating: element.dataValues.rating,
        // createdAt: element.dataValues.createdAt,
        // updatedAt: element.dataValues.updatesAt,
        companyName: element.dataValues.Company.dataValues.name,
        companyObj: element.dataValues.Company.dataValues,
        contactObj: element.dataValues.Contacts,
        stageObj: element.dataValues.Stages,
        sourceObj: element.dataValues.Sources
    })
    );

    // console.log(arrOfObjs)
    var hbsObj = {
        layout: false,
        applications: arrOfObjs
    }

    // Partial: "partials/jobs/application-block"
    res.render(partial, hbsObj);
    // res.json(arrOfObjs);

}

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
            renderApplications(applications, res, "partials/jobs/application-block");
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
            renderApplications(application, res, "partials/jobs/application-block");
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
            // console.log(fieldList.dataValues)
            const fieldArray = fieldList.map(app => Object.values(app.dataValues))
            // console.log(fieldArray);
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