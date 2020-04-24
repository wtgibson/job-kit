const express = require("express");
const exphbs = require("express-handlebars");

var PORT = process.env.PORT || 3000;

var app = express();

app.use(express.statiic("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// var routes = require("./controllers/jobkit_controller.js");

app.use(routes);

app.listen(PORT, function() {
    console.log("Server listening at localhost:" + PORT);
});