const axios = require("axios")

module.exports = function (app) {


    // send default page to all routes that are undefined
    app.get("/", (req, res) => {
        res.render("index");
    });

    app.get("/add", (req, res) => {
        res.render("add-app")
    });

    app.get("/edit", (req, res) => {
        res.render("edit-app")
    });

    app.get("/login", (req, res) => {
        res.render("login");
    });

    app.get("/signup", (req, res) => {
        res.render("signup");
    });

    // send default page to all routes that are undefined
    app.get("/profile", (req, res) => {
        res.render("profile");
    });

    app.get("/applications", (req, res) => {
        res.render("applications");
    });

    app.get("/jobs", (req, res) => {
        res.render("jobs");
    });

    app.get("/api/jobs/:lang", (req, res) => {
        var lang = req.params.lang;
        axios.get(`https://jobs.github.com/positions.json?search=${lang}`)
            .then(function (response) {
                var rendered = {
                    layout: false,
                    jobs: response.data
                }
                res.render("partials/jobs/jobs-block", rendered)
            })
            .catch(function (err) {
                console.log(err)
            });
    })

    app.get("/api/jobs/:lang/:zip", (req, res) => {
        var lang = req.params.lang;
        var zip = req.params.zip;
        console.log(`https://jobs.github.com/positions.json?search=${lang}&location="${zip}"`)

        axios.get(`https://jobs.github.com/positions.json?search=${lang}&location="${zip}"`)
            .then(function (response) {
                var rendered = {
                    layout: false,
                    jobs: response.data
                }
                res.render("partials/jobs/jobs-block", rendered)
            })
            .catch(function (err) {
                console.log(err)
            });
    })

}