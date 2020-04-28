var db = require("../models");

module.exports = function (app) {

    
    // Get All Contacts for Application
    app.get("/api/application/:applicationId/contact", (req, res) => {
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
    app.get("/api/company/:companyId/contact", (req, res) => {
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
    app.get("/api/application/:applicationId/contact/:contactId", (req, res) => {
        db.Contact.findOne({
            where: {
                ApplicationId: req.params.applicationId,
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
    app.post("/api/application/:applicationId/contact", (req, res) => {
        db.Contact.create(req.body, {
            where: {
                ApplicationId: req.params.applicationId
            }
        }).then(contact => {
            res.send(`Contact, ${contact.type}, has been created`)
        }).catch(err => {
            console.log(err);
            res.send(`Contact, ${contact.type}, was NOT created`)
        });
    });

    // Update Contact
    app.put("/api/application/:applicationId/contact/:contactId", (req, res) => {
        db.Contact.update({
            where: {
                ApplicationId: req.params.applicationId,
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
    app.delete("/api/application/:applicationId/contact/:contactId", (req, res) => {
        db.Contact.destroy({
            where: {
                ApplicationId: req.params.applicationId,
                id: req.params.stageId
            },
        }).then(() => {
            res.send(true);
        }).catch(err => {
            console.log(err);
            res.send(false);
        });
    });
}