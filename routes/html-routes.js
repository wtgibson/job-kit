var db = require("../models");
const axios = require("axios")

module.exports = function (app) {


    // send default page to all routes that are undefined
    app.get("/", (req, res) => {
        res.render("index");
    });

    app.get("/new-app", (req, res) => {
        res.render("add-app",data)
    });

    app.get("/login", (req, res) => {
        res.render("login");
    });

    app.get("/signup", (req,res) => {
        res.render("signup");
    });

    // send default page to all routes that are undefined
    app.get("/profile", (req, res) => {
        res.render("profile")
    });

    app.get("/applications", (req, res) => {
        res.render("applications");
    });

    app.get("/jobs", (req, res) => {
        axios.get("https://jobs.github.com/positions.json?search=code")
            .then(function (response) {
                var rendered = {
                    jobs: response.data
                }
                res.render("jobs", rendered)
            })
            .catch(function (err) {
                console.log(err)
            });
    })

}