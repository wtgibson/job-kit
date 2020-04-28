
$(function () {

    var globalUserId;
    var defaultZipCode;
    var defaultJob;
    globalUserId = 1;

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
            UserId: globalUserId
        }

        $.ajax("/api/application", {
            type: "POST",
            data: newApp,
        }).then(function (res) {
            console.log(res)
            // var newCompany = {
            //     name: $(`#company-${id}`).text(),
            //     zipCode: "None",
            //     url: $(`#company-${id}`).attr("href"),
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