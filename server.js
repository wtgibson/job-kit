// Dependencies

const express = require("express");
var admin = require("firebase-admin");

// Set up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

// Static Directory
app.use(express.static("public"));

// Configure and Initialize Firebase for Authentication
var serviceAccount = require("./config/jobkit-project-2-firebase-adminsdk-ilq2k-031de0927d.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://jobkit-project-2.firebaseio.com"
});

// Requiring our Models for Syncing
var db = require("./models");

// Parse Request Body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
require("./routes/api-application-routes.js")(app);
require("./routes/api-application-filters.js")(app);
require("./routes/api-company-routes.js")(app);
// require("./routes/api-company-filters.js")(app);
require("./routes/api-contact-routes.js")(app);
require("./routes/api-contact-filters.js")(app);
require("./routes/api-source-routes.js")(app);
require("./routes/api-source-filters.js")(app);
require("./routes/api-stage-routes.js")(app);
require("./routes/api-stage-filters.js")(app);
require("./routes/api-user-routes.js")(app);
require("./routes/html-routes.js")(app);


// Syncing Sequelize Models
db.sequelize.sync().then(function () {
    // Starting Express app
    app.listen(PORT, function () {
        console.log("Server listening at localhost:" + PORT);
    });
});


// call to github jobs API needs to happen on the server side
// helpful code that needs to be examined more:
