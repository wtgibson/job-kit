var db = require("../models");

module.exports = function (app) {

    // Get All Companies for User
    app.get("/api/user/:userId/company/all", (req, res) => {
        db.Company.findAll({
            where: {
                UserId: req.params.userId
            },
            include:
                [db.Contact]
        }).then(companies => {
            res.json(companies);
        }).catch(err => {
            console.log(err);
            res.send('No data found');
        });
    });

    // Get Company using ID
    app.get("/api/user/:userId/company/:companyName", (req, res) => {
        db.Company.findAll({
            where:
            {
                UserId: req.params.userId,
                name: req.params.companyName
            },
            include:
                [db.Contact]
        }).then(company => {
            res.json(company);
        }).catch(err => {
            console.log(err);
            res.send('No data found');
        });
    });

    // Get All Company - Name, Zipcode
    app.get("/api/user/:userId/company/all/:field", (req, res) => {
        db.Company.findAll({
            where: {
                UserId: req.params.userId
            },
            attributes: [req.params.field]
        }).then(companies => {
            res.json(companies);
            console.log(companies);
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });
    });

    // Create Company 
    app.post("/api/company", (req, res) => {
        db.Company.create(req.body, {
        }).then(company => {
            res.send(`Company ${company.dataValues.name}, has been created`)
        }).catch(err => {
            console.log(err);
            res.send(`Company ${company.dataValues.name}, was NOT created`)
        });
    });

}