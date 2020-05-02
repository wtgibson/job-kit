var db = require("../models");

function renderContact(contacts, res, partial) {
    if (partial === undefined) {
        return res.json(contacts);
    }
    var newContacts = contacts;
    // If a single object add to an array
    if (!Array.isArray(contacts)) {
        newContacts = [contacts];
    }
    var arrOfObjs = newContacts.map(({dataValues: {id, name, email, phone, type}}) => ({
        id,
        name,
        email,
        phone,
        type
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

    
    // Get All Contacts for Application
    app.get("/api/application/:applicationId/contact/all", (req, res) => {
        db.Contact.findAll({
            where: {
                ApplicationId: req.params.applicationId
            },
        }).then(contacts => {
            // Add Partial as third argument
            renderContact(contacts, res);
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
            // Add Partial as third argument
            renderContact(contacts, res);
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
            // Add Partial as third argument
            renderContact(contacts, res, "partials/contacts/contact-block");
        }).catch(err => {
            console.log(err);
            res.send(false);
        });  
    });

    // Create New Contact
    app.post("/api/contact/new", (req, res) => {
        db.Contact.create(req.body, {
            // ApplicationId and CompanyId sent from client
        }).then(contact => {
            res.json(contact.dataValues.id)
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
        }).then((rowsDeleted) => {
            rowsDeleted ? res.send(true) : res.send(false);
        }).catch(err => {
            console.log(err);
            res.send(false);
        });
    });
}