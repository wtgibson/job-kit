var db = require("../models");

module.exports = function (app) {

    app.put("/api/user", (req, res) => {
        // search User table for one item where email & password matches req.body
        db.User.findOne({
            where: req.body
        }).then(user=> {
            // send user id back to client
            res.json(user.id);
        }).catch(err => {
            // error
            console.log(err);
            // send a false statement for client to handle error
            res.send(false);
        })
    })

    app.post("/api/login", (req, res) => {
        db.User.create(req.body)
            .then(user => {
                res.json(user.id);
            }).catch(err => {
                console.log(err)
                res.send(false);
            });
    });

    app.get("/api/login/:email", (req, res) => {
        db.User.findAll({
            where: {
                email: req.params.id
            },
            attributes: ["id", "email", "name"]
        }).then(user => {
            if (user.length > 0 || user === undefined) {
                // Send a failure statement if there are more
                // one matches for the email
                res.send("Login Failed");
            } else {
                res.json(user);
            }
        });
    });

    // route used to update information for a specific user
    app.put("/api/login/:id", (req, res) => {
        // update a row in User table where id matches
        db.User.update(req.body, {
            where: 
            {
                id: req.params.id
            }
        }).then(() => {
            // send confirmation because client doesn't need data back
            res.send('Completed');
        }).catch(err => {
            console.log(err);
            res.send("Failed to update")
        });
    });

// END of module
}