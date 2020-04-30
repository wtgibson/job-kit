// REQUIREMENTS - The routes are providing access to the models.  PASSPORT is used to authenticate the user on the MySql Server

var db = require("../models");
// var passport = require("../config/passport.js");

// Create the routes for the USER model.  Login, SignUp, View Profile, Update Profile.
module.exports = function (app) {

    // Route to use with [Login] utilizing passport.
    // app.post("/api/login", passport.authenticate("local"), function (req, res) {
    //     res.json(req.user);
    // });

    // Login & return the ID for the authenticated user
    app.put("/api/login", (req, res) => {
        // search User table for one item where email & password matches req.body
        db.User.findOne({
            where: req.body
        }).then(user => {
            // send user id back to client
            // res.render('applications');
            console.log(user.id);
            res.json(user.id);

        }).catch(err => {
            // error
            console.log(err);
            // send a false statement for client to handle error
            res.send(false);
        })
    })

    // Signup a new authenticated user
    app.post("/api/signup", (req, res) => {
        console.log(req.body);
        db.User.create(req.body, {
            })
            .then(user => {
                res.json(user.dataValues.id);
            }).catch(err => {
                console.log(err)
                res.status(401).json(err);
            });
    });

    // // Get user profile
    // app.get("/api/userProfile", function (req, res) {
    //     if (!req.user) {
    //         // The user is not logged in, send back an empty object
    //         res.json({});
    //     } else {
    //         // Otherwise send back the user's email and id
    //         // Sending back a password, even a hashed password, isn't a good idea
    //         db.User.findOne({
    //             where: {
    //                 id: req.params.id
    //             }
    //             // attributes: ["id", "email", "name"]
    //         }).then(user => {
    //             res.json({
    //                 email: req.user.email,
    //                 id: req.user.id,
    //                 name: req.user.name,
    //                 zipCode: req.user.zipCode,
    //                 jobTitle: req.user.jobTitle
    //             });
    //         });
    //     };
    // });

    // Get user profile
    app.get("/api/user/:id", (req, res) => {
        db.User.findOne({
            where: {
                id: req.params.id
            }
            // attributes: ["id", "email", "name"]
        }).then(user => {
            // res.json(user)
            // res render is calling on the jobs profile partial and returning html with the information provided
            res.render("partials/jobs/profile-block", {
                layout: false,
                createdAt: user.createdAt,
                name: user.name,
                zipCode: user.zipCode,
                jobTitle: user.jobTitle,
            });
        });
    });

    // route used to update information for a specific user
    app.put("/api/user/:id", (req, res) => {
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

    // route to logout
    app.get("/logout", (req, res) => {
        firebase.auth().signOut();;
        res.render("login");
    })

    // END of module
}