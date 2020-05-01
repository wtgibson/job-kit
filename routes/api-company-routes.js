var db = require("../models");


function renderCompanies(companies, res, partial) {
    if (partial === undefined) {
        return res.json(companies);
    }
    var newCompany = companies;
    // If a single object add to an array
    if (!Array.isArray(companies)) {
        newCompany = [companies];
    }
    var arrOfObjs = newCompany.map(({ dataValues: { id, name, zipCode, URL, Contacts } }) => ({
        id,
        name,
        zipCode,
        URL,
        contacts: Contacts,

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

    // Get All Companies for User
    app.get("/api/user/:userId/company/all", (req, res) => {
        db.Company.findAll({
            where: {
                UserId: req.params.userId
            },
            include:
                [db.Contact]
        }).then(companies => {
            // Add Partial as third argument
            renderCompanies(companies, res)
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
            // Add Partial as third argument
            renderCompanies(company, res)
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
        // ApplicationId and UserId sent from client
        db.Company.create(req.body, {
        }).then(company => {
            res.json(company.dataValues.id)
            // res.send(`Company ${company.dataValues.name}, has been created`)
        }).catch(err => {
            console.log(err);
            res.send(`Company ${company.dataValues.name}, was NOT created`)
        });
    });

    // _____ Ana added routes ------

    app.get("/api/company/:appId", (req, res) => {
        db.Company.findAll({
            where: {
                ApplicationId: req.params.appId,
            },
        }).then(companies => {
            console.log(`companies: ${companies}`)
            res.json(companies)
            // console.log(companies);
        }).catch(err => {
            console.log(err);
            res.send("No data found");
        });
    });


    app.put("/api/company/:appId", (req, res) => {
        db.Company.update(req.body, {
            where: {
                ApplicationId: req.params.appId
            },
        }).then(() => {
            res.json("Completed");
        }).catch(err => {
            console.log(err);
            res.send("Failed to update");
        });  
    });

}
