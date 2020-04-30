var db = require("../models");

function renderUser(users, res, partial) {
    if (partial === undefined) {
        return res.json(users);
    }
    var newUsers = users;
    // If a single object add to an array
    if (!Array.isArray(users)) {
        newUsers = [users];
    }
    var arrOfObjs = newUsers.map(({dataValues: {id, email, name, zipCode, jobTitle, createdAt}}) => ({
        id,
        email,
        name,
        zipCode,
        jobTitle,
        createdAt
            
    }));

    var x = {
        layout: false,
        applications: arrOfObjs
    }

    // Partial: "partials/jobs/application-block"
    res.render(partial, x);
}


// Create the routes for the USER model.  Login, SignUp, View Profile, Update Profile.
module.exports = function (app) {

     // Get user profile
     app.get("/api/user/:id", (req, res) => {
        db.User.findOne({
            where: {
                id: req.params.id
            }
        }).then(user => {
            // res.json(user)
            // res render is calling on the jobs profile partial and returning html with the information provided
            // renderUser(user, res, "partials/jobs/profile-block");
            res.render("partials/jobs/profile-block", {
                layout: false,
                createdAt: user.createdAt,
                id: user.id,
                name: user.name,
                zipCode: user.zipCode,
                jobTitle: user.jobTitle,
            });
        });
    });

     // Get route to logout
     app.get("/logout", (req, res) => {
        firebase.auth().signOut();;
        res.render("login");
    });

    // Create a new authenticated user "Signup"
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

    // Login & return the ID for the authenticated user
    app.put("/api/login", (req, res) => {
        // Find one user where email & password matches req.body
        db.User.findOne({
            where: req.body
        }).then(user => {
            // send user id back to client
            // res.render('applications');
            console.log(user.id);
            res.json(user.id);

        }).catch(err => {
            console.log(err);
            res.send(false);
        });
    });

    // Update information for a specific user
    app.put("/api/user/:id", (req, res) => {
        // Update a row in User table where id matches
        db.User.update(req.body, {
            where:
            {
                id: req.params.id
            }
        }).then(() => {
            res.send('Completed');
        }).catch(err => {
            console.log(err);
            res.send("Failed to update")
        });
    });
}