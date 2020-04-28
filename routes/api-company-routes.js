var db = require("../models");

module.exports = function (app) {

    // Get All Companies for User
    app.get("/api/user/:userId/company/all", (req, res) => {
        db.Company.findAll({
            where: {
                UserId: req.params.userId
            }
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
            }
        }).then(company => {
            res.render("application", company);
        }).catch(err => {
            console.log(err);
            res.send('No data found');
        });
    });

    // Create Company 
    app.post("/api/company", (req, res) => {
        db.Company.create(req.body, {
        }).then(company => {
            res.send(`Company, ${company.name}, has been created`)
        }).catch(err => {
            console.log(err);
            res.send(`Company, ${company.name}, was NOT created`)
        });
    });

}