var db = require("../models");

module.exports = function (app) {

    // Get All Applications
    app.get("/api/user/:id/application/all", (req, res) => {
        db.Application.findAll({
            where: {
                UserId: req.params.id
            },
            include: [
                {
                    model: db.Company,
                    include:
                        [db.Contact]
                },
                { model: db.Contact },
                { model: db.Source },
                { model: db.Stage }
            ]
        }).then(applications => {
            // res.json(applications);
            var x = {
                layout: false,
                applications: [
                {
                    id: 1,
                    title: 'Angular Full Stack Software Engineer',
                    type: 'FTE or PTE',
                    description: 'Mean Stack Software Engineer',
                    industry: 'Oil and Energy',
                    zipCode: '94536',
                    salaryRange: '3',
                    dateApplied: '03-02-2020',
                    rating: "2",
                    createdAt: '2020 - 04 - 28T15: 41: 53.000Z',
                    updatedAt: '2020 - 04 - 28T15: 41: 53.000Z',
                    UserId: "1",
                },
                {
                    id: 2,
                    title: 'Angular Software Engineer',
                    type: 'FTE or PTE',
                    description: 'Mean are Engineer',
                    industry: 'Oil and Energy',
                    zipCode: '94536',
                    salaryRange: '3',
                    dateApplied: '03-02-2020',
                    rating: "2",
                    createdAt: '2020 - 04 - 28T15: 41: 53.000Z',
                    updatedAt: '2020 - 04 - 28T15: 41: 53.000Z',
                    UserId: "1",
                }
            ]}

            res.render("partials/jobs/application-block",x)

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
                {
                    model: db.Company,
                    include:
                        [db.Contact]
                },
                { model: db.Contact },
                { model: db.Source },
                { model: db.Stage }
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
            rowsDeleted ? res.send(true) : res.send(false)
        }).catch(err => {
            console.log(err);
            res.send(false);
        });
    });

}