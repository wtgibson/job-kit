$(function () {
    let globalUserID = sessionStorage.getItem('uuid');
    let codingLanguage = sessionStorage.getItem('clid');

    $(document).on("submit", "#search-form", function () {
        event.preventDefault();
        var locationCity = $(".job-search-bar").val().trim();
        $.ajax(`/api/jobs/${codingLanguage}/${locationCity}`, {
            type: "GET"
        }).then(function (resp) {
            $("#github-jobs").empty()
            $("#github-jobs").prepend(resp)
        })

    });

    $.ajax(`/api/jobs/${codingLanguage}`, {
        type: "GET"
    }).then(function (resp) {
        $("#github-jobs").append(resp)
    })


    $(document).on("click", ".link-to-ext", function () {
        event.preventDefault();

        // extract data from the html
        var id = $(this).data("jobid");
        var title = $(`#title-${id}`).text();
        var desc = $(`#desc-${id}`).text();
        var company = $(`#company-${id}`).text();
        var compLink = $(`#company-${id}`).attr("href");
        var location = $(`#loc-${id}`).text();
        var type = $(`#type-${id}`).text();
        var postLink = $(`#url-${id}`).attr("href");


        var newApp = {
            title: title,
            type: type,
            description: desc,
            UserId: globalUserID,
        }

        $.ajax("/api/application", {
            type: "POST",
            data: newApp,
        })
            .then(function (res1) {
                // receives back the user id
                console.log(res1)
                var newCompany = {
                    name: company,
                    zipCode: location,
                    URL: compLink,
                    ApplicationId: res1,
                    UserId: globalUserID
                }
                $.ajax("/api/company", {
                    type: "POST",
                    data: newCompany,
                }).then(function (res3) {
                    console.log(res3)
                    // receives back the company id
                    var newSource = {
                        source: "GitHub Jobs API",
                        linkToPosting: postLink,
                        jobID: id,
                        ApplicationId: res1
                    }
                    $.ajax("/api/source/new", {
                        type: "POST",
                        data: newSource,
                    }).then(function (res4) {
                        console.log(res4)
                    })

                })
            })

    })

})