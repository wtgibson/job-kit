var db = require("../models");

module.exports = function (app) {

    
    // Get All Contacts for Application
    app.get("/api/application/:applicationId/contact/all", (req, res) => {
        db.Contact.findAll({
            where: {
                ApplicationId: req.params.applicationId
            },
        }).then(contacts => {
            res.json(contacts);
        }).catch(err => {
            console.log(err);
            res.send(false);
        });  
    });

    // Get All Contacts for Company
    // Each user has there own instance of Company
    app.get("/api/company/:companyId/contact/all", (req, res) => {
        db.Contact.findAll({
            where: {
                CompanyId: req.params.companyId
            },
        }).then(contacts => {
            res.json(contacts);
        }).catch(err => {
            console.log(err);
            res.send(false);
        });  
    });

    // Get One Contact
    app.get("/api/contact/:contactId", (req, res) => {
        db.Contact.findOne({
            where: {
                id: req.params.contactId
            },
        }).then(contacts => {
            res.json(contacts);
        }).catch(err => {
            console.log(err);
            res.send(false);
        });  
    });

    // Create New Contact
    app.post("/api/contact/new", (req, res) => {
        db.Contact.create(req.body, {
            // Create with model id (application and company) using req.body
            // Currently Null
        }).then(contact => {
            res.send(`Contact ${contact.dataValues.type}, has been created`)
        }).catch(err => {
            console.log(err);
            res.send(`Contact ${contact.dataValues.type}, was NOT created`)
        });
    });

    // Update Contact
    app.put("/api/contact/:contactId", (req, res) => {
        db.Contact.update(req.body, {
            where: {
                id: req.params.contactId
            },
        }).then(() => {
            res.json("Completed");
        }).catch(err => {
            console.log(err);
            res.send("Failed to update");
        });  
    });

    // Delete Contact
    app.delete("/api/contact/:contactId", (req, res) => {
        db.Contact.destroy({
            where: {
                id: req.params.contactId
            },
        }).then(() => {
            res.send(true);
        }).catch(err => {
            console.log(err);
            res.send(false);
        });
    });
}