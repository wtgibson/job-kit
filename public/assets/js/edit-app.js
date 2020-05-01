$(function () {
    let globalUserID = sessionStorage.getItem('uuid');
    let appID = sessionStorage.getItem('caid');


    $.ajax(`/api/application/${appID}`, {
        type: "GET"
    }).then(function (res) {
        $("#app-title").val(res.title);
        // $("#app-type").value(res.type);
        $("#app-desc").val(res.description);
        $("#app-industry").val(res.industry);
        $("#app-zipCode").val(res.zipCode);
        $("#app-salary").val(res.salaryRange);
        $("#app-applied").val(res.dateApplied);
        $("#app-rating").val(res.rating);
    })

    $.ajax(`/api/company/${appID}`, {
        type: "GET"
    }).then(function (res2) {
        $("#comp-name").val(res2.name);
        $("#comp-zipCode").val(res2.zipCode);
        $("#comp-link").val(res2.URL)
    })

    $.ajax(`/api/application/${appID}/source/all`, {
        type: "GET"
    }).then(function (res2) {
        $("#src-source").val(res2.source);
        $("#src-posting").val(res2.linkToPosting);
        $("#src-applyType").val(res2.applyType);
        $("#src-resume").val(res2.resumeVersion);
    })


    $("#app-edit").on("click", function (event) {
        event.preventDefault();

        // ------- Update App ---------
        var updateApp = {
            title: $("#app-title").val(),
            type: $("#app-type").val(),
            description: $("#app-desc").val(),
            industry: $("#app-industry").val(),
            zipCode: $("#app-zipCode").val(),
            salaryRange: $("#app-salary").val(),
            dateApplied: $("#app-applied").val(),
            rating: $("#app-rating").val(),
            UserId: globalUserID
        }

        console.log(`Trying to update this app: ${appID}`)
        $.ajax(`/api/application/${appID}`, {
            type: "PUT",
            data: updateApp,
        }).then(function (res1) {
            console.log(res1)
        })

        // ------- Update Company ---------

        var updateCompany = {
            name: $("#comp-name").val(),
            zipCode: $("#comp-zipCode").val(),
            URL: $("#comp-link").val(),
        }

        $.ajax(`/api/company/${appID}`, {
            type: "PUT",
            data: updateCompany,
        }).then(function (res) {
            console.log(res)
        })


        // ------- Update Source ---------

        var updateSource = {
            source: $("#src-source").val(),
            linkToPosting: $("#src-posting").val(),
            applyType: $("#src-applyType").val(),
            resumeVersion: $("#src-resume").val(),
        }

        $.ajax(`/api/source/${appID}`, {
            type: "PUT",
            data: updateSource,
        }).then(function (res) {
            console.log(res)
        })

        
        $("#add-data-form").append(`<h2> Your form was submitted </h2>`)


    })

    

})
