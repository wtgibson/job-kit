// Dependencies
const express = require("express");

// Set up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

// Static Directory
app.use(express.static("public"));

// Requiring our Models for Syncing
var db = require("./models");

// Parse Request Body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app, path);

// Syncing Sequelize Models
db.sequelize.sync().then(function () {
    // Starting Express app
    app.listen(PORT, function () {
        console.log("Server listening at localhost:" + PORT);
    });
});