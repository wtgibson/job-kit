
$(function () {

    var globalUserId;
    var defaultZipCode;
    var defaultJob;
    globalUserId = 1;
    // login function that confirms login and returns global user id

    $("#login-button").on("click", function (event) {
        event.preventDefault();
        var username = $("#username").val().trim()
        var password = $("#password").val().trim()
        var login = {
            email: username,
            password: password
        }

        $.ajax("/api/login", {
            type: "PUT",
            data: login
        }).then(
            function (data) {
                globalUserId = data;
            }
        );
    })

    // function for saving job data

    $("#applications-nav").on("click", function () {
        console.log("You updated the data")
        $.ajax("/api/user/1/application/all"), {
            type: "GET"
        }.then(function (data) {
            console.log(JSON.stringify(data))
        })
    })

    $(document).on("click", ".link-to-ext", function () {
        event.preventDefault();
        console.log("you clicked me!")
        var id = $(this).data("jobid");
        var title = $(`#title-${id}`).text();
        var desc = $(`#desc-${id}`).text();

        console.log(title)
        console.log(desc)

        var newApp = {
            title: title,
            description: "desc",
            industry: "None",
            zipCode: "94114",
            salaryRange: 0,
            rating: 0,
            createdAt: "03/20/2020",
            updatedAt: "03/20/2020",
            UserId: globalUserId
        }

        $.ajax("/api/application", {
            type: "POST",
            data: newApp,
        }).then(function (res) {
            console.log(res)
            // var newCompany = {
            //     name: $(`company-${id}`).text(),
            //     zipCode: "None",
            //     url: $(`company-${id}`).attr("href"),
            //     createdAt: 0,
            //     updatedAt: 0,
            //     UserID: globalUserId
            // }
            // $.ajax("/api/company", {
            //     type: "POST",
            //     data: newCompany
            // }).then(function () {
            //     console.log("Successfully added the company")
            // })
        })

    })

    $("#app-add").on("submit", function (event) {
        event.preventDefault();
        console.log("You tried to add something")

        var newApp = {
            title: $("#app-title").val(),
            type: $("#app-type").val(),
            description: $("#app-desc").val(),
            industry: $("#app-industry").val(),
            zipCode: $("#app-zipCode").val(),
            salaryRange: $("#app-salary").val(),
            rating: $("#app-rating").val(),
            UserId: globalUserId
        }
        $.ajax("/api/application", {
            type: "POST",
            data: newApp,
        }).then(function () {
            console.log("successfully added the app")
        })
    })
});