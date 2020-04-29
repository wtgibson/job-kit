var db = require("../models");

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
            // res.json(applications);
            // // console.log("-----------------/n", applications[0])
            // // var parsedApps = JSON.parse(applications[0])
            var arrOfObjs = []

            applications.forEach(element => arrOfObjs.push({
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
                company: element.dataValues.company,
                contacts: element.dataValues.contacts,
                stages: element.dataValues.stages,
                sources: element.dataValues.sources
            }))

            console.log(arrOfObjs)
            var x = {
                layout: false,
                applications: arrOfObjs}

            res.render("partials/jobs/application-block", x)

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
        }).then(applications => {
            res.json(applications);
            console.log(applications);
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
            res.json(application);
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });

    });

    // Create Application
    app.post("/api/application", (req, res) => {
        db.Application.create(req.body, {
        }).then((application) => {
            res.send(`Application for ${application.dataValues.title}, has been created`)
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