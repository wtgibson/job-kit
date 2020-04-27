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

    // find one compnay with all the associated table fields
    app.get("/api/company/:name", (req, res) => {
        db.Company.findAll({
            where: 
            {
                name: req.params.name
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
            res.json(company);
        }).catch(err => {
            console.log(err);
            res.send('No data found');
        });
    });

    app.get("/api/company/all", (req, res) => {
        db.Company.findAll({
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