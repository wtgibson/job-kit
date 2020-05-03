var db = require("../models");
const renderApps = require("./api-application-render.js");

module.exports = function (app) {

    // Get All Apps with Title
    app.get("/api/user/:userId/application/filter/title/:title", (req, res) => {
        db.Application.findAll({
            where: { userId: req.params.userId, title: req.params.title },
            include: [
                { model: db.Company },
                { model: db.Contact },
                { model: db.Stage },
                { model: db.Source }
            ]
        }).then(applications => {
            renderApps(applications, res, "partials/jobs/application-block");
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });

    });

    // Get All Apps with ZipCode
    app.get("/api/user/:userId/application/filter/zipCode/:zipCode", (req, res) => {
        db.Application.findAll({
            where: { userId: req.params.userId, zipCode: req.params.zipCode },
            include: [
                { model: db.Company },
                { model: db.Contact },
                { model: db.Stage },
                { model: db.Source }
            ]
        }).then(applications => {
            renderApps(applications, res, "partials/jobs/application-block");
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });

    });

    // Get All Apps with industry
    app.get("/api/user/:userId/application/filter/industry/:industry", (req, res) => {
        db.Application.findAll({
            where: { userId: req.params.userId, industry: req.params.industry },
            include: [
                { model: db.Company },
                { model: db.Contact },
                { model: db.Stage },
                { model: db.Source }
            ]
        }).then(applications => {
            renderApps(applications, res, "partials/jobs/application-block");
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });

    });

    // Get All Apps with Rating
    app.get("/api/user/:userId/application/filter/rating/:rating", (req, res) => {
        db.Application.findAll({
            where: { userId: req.params.userId, rating: req.params.rating },
            include: [
                { model: db.Company },
                { model: db.Contact },
                { model: db.Stage },
                { model: db.Source }
            ]
        }).then(applications => {
            renderApps(applications, res, "partials/jobs/application-block");
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });

    });

    // Filter application with source
    app.get("/api/user/:userId/application/filter/source/:filter", (req, res) => {
        db.Application.findAll({
            where: {
                UserId: req.params.userId,
            },
            include: [
                {
                    model: db.Source,
                    as: "Sources".Sources,
                    required: true,
                    where: {
                        source: req.params.filter
                    }
                },
                { model: db.Company },
                { model: db.Contact },
                { model: db.Stage }

            ]
        }).then(applications => {
            renderApps(applications, res, "partials/jobs/application-block")
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });

    });

    // Filter application with applyType
    app.get("/api/user/:userId/application/filter/applyType/:filter", (req, res) => {
        db.Application.findAll({
            where: {
                UserId: req.params.userId,
            },
            include: [
                {
                    model: db.Source,
                    as: "Sources".Sources,
                    required: true,
                    where: {
                        applyType: req.params.filter
                    }
                },
                { model: db.Company },
                { model: db.Contact },
                { model: db.Stage }

            ]
        }).then(applications => {
            renderApps(applications, res, "partials/jobs/application-block")
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });

    });

    // Filter application with resumeVersion
    app.get("/api/user/:userId/application/filter/resumeVersion/:filter", (req, res) => {
        db.Application.findAll({
            where: {
                UserId: req.params.userId,
            },
            include: [
                {
                    model: db.Source,
                    as: "Sources".Sources,
                    required: true,
                    where: {
                        resumeVersion: req.params.filter
                    }
                },
                { model: db.Company },
                { model: db.Contact },
                { model: db.Stage }

            ]
        }).then(applications => {
            renderApps(applications, res, "partials/jobs/application-block");
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });

    });

    // Filter application with currentStage
    app.get("/api/user/:userId/application/filter/currentStage/:filter", (req, res) => {
        db.Application.findAll({
            where: {
                UserId: req.params.userId,
            },
            include: [
                {
                    model: db.Stage,
                    as: "Stages".Stages,
                    required: true,
                    where: {
                        currentStage: req.params.filter
                    }
                },
                { model: db.Company },
                { model: db.Contact },
                { model: db.Source }

            ]
        }).then(applications => {
            renderApps(applications, res, "partials/jobs/application-block");
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });

    });

    // Filter application with company name
    app.get("/api/user/:userId/application/filter/companyName/:filter", (req, res) => {
        db.Application.findAll({
            where: {
                UserId: req.params.userId,
            },
            include: [
                {
                    model: db.Company,
                    as: "Companies".Companies,
                    required: true,
                    where: {
                        name: req.params.filter
                    }
                },
                { model: db.Contact },
                { model: db.Source },
                { model: db.Stage }

            ]
        }).then(applications => {
            renderApps(applications, res, "partials/jobs/application-block");
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });

    });
}