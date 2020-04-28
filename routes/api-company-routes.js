var db = require("../models");

module.exports = function (app) {

    app.post("/api/company", (req, res) => {
        // Create company and contacts
        db.Company.create(req.body, {
        }).then(company => {
            res.send(`Company, ${company.name}, has been created`)
        }).catch(err => {
            console.log(err);
            res.send(`Company, ${company.name}, was NOT created`)
        });
    });

    // find one compnay with all the associated applications
    app.get("/api/company/:id", (req, res) => {
        db.Company.findAll({
            where: 
            {
                name: req.params.id
            },
            include: 
            {
                model: db.Application,
                    include:{ 
                        model: db.Contact,
                        model: db.Source,
                        model: db.Stage
                    }
            }
        }).then(company => {
            res.render("application", company);
        }).catch(err => {
            console.log(err);
            res.send('No data found');
        });
    });

    // find all company names and id that match the user
    // this could be a drop down to select a list of companies and
    // then pull all the applications associated with that company
    app.get("/api/company/:id/all", (req, res) => {
        db.Company.findAll({
            where: {UserId: req.params.id},
            include: 
            {
                model: db.Application,
                    include:{ 
                        model: db.Contact,
                        model: db.Source,
                        model: db.Stage
                    }
            }
        }).then(companies => {
            res.json(companies);
        }).catch(err => {
            console.log(err);
            res.send('No data found');
        })
    })

}