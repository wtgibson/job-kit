$(function () {
    let globalUserID = sessionStorage.getItem('uuid');
    let appID = sessionStorage.getItem('caid');

    var roleType;
    var interest;

    $.ajax(`/api/application/${appID}`, {
        type: "GET"
    }).then(function (res) {
        $("#app-title").val(res.title);
        $("#app-desc").val(res.description);
        $("#app-industry").val(res.industry);
        $("#app-zipCode").val(res.zipCode);
        $("#app-salary").val(res.salaryRange);
        $("#app-applied").val(res.dateApplied);
        var el1 = document.getElementsByClassName("role-interest");
        $(el1[res.rating - 1]).attr("checked", "checked")

        var el2 = document.getElementsByClassName("app-type");
        for (let i = 0; i < el2.length; i++) {
            if ($(el2[i]).val() == res.type) {
                $(el2[i]).attr("checked", "checked")
            }
        }
        // var el2 = document.getElementsByClassName("app-type");
        // $(el2[res.rating]).attr("checked", "checked")
    })

    console.log(`/api/company/${appID}`)


    $.ajax(`/api/company/${appID}`, {
        type: "GET"
    }).then(function (res2) {
        let company = res2;
        $("#comp-name").val(company.name);
        $("#comp-zipCode").val(company.zipCode);
        $("#comp-link").val(company.URL)
    })

    $.ajax(`/api/application/${appID}/source/all`, {
        type: "GET"
    }).then(function (res3) {
        let firstSource = res3[0];
        $("#src-source").val(firstSource.source);
        $("#src-posting").val(firstSource.linkToPosting);
        $("#src-applyType").val(firstSource.applyType);
        $("#src-resume").val(firstSource.resumeVersion);
    })


    $("#app-edit").on("click", function (event) {
        event.preventDefault();

        elements = document.getElementsByClassName("app-type");
        for (let i = 0; i < elements.length; i++) {
            if ($(elements[i]).prop("checked")) {
                roleType = ($(elements[i]).val())
            }
        }

        elements = document.getElementsByClassName("role-interest");
        for (let i = 0; i < elements.length; i++) {
            if ($(elements[i]).prop("checked")) {
                interest = ($(elements[i]).val())
            }
        }

        let appZip;
        if($("#app-zipCode").val()==""){
            appZip = "     "
        }
        else{
            appZip = $("#app-zipCode").val()
        }

        // ------- Update App ---------
        var updateApp = {
            title: $("#app-title").val(),
            type: roleType,
            description: $("#app-desc").val(),
            industry: $("#app-industry").val(),
            zipCode: appZip,
            salaryRange: $("#app-salary").val(),
            dateApplied: $("#app-applied").val(),
            rating: interest,
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
