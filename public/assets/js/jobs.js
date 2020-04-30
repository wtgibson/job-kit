$(function () {
    let globalUserID = sessionStorage.getItem('uuid');
    let 


    $.ajax(`/api/jobs/` + globalUserZip, {
        type: "GET"
    }).then(function (resp) {
        $("#github-jobs").append(resp)
    })


    $(document).on("click", ".link-to-ext", function () {
        // event.preventDefault();

        var id = $(this).data("jobid");
        var title = $(`#title-${id}`).text();
        var desc = $(`#desc-${id}`).text();
        var company = $(`#company-${id}`).text();
        var link = $(`#company-${id}`).attr("href");
        var location = $(`#location-${id}`).text();
        

        var newApp = {
            title: title,
            type: "",
            description: desc,
            industry: "None",
            zipCode: "94114",
            salaryRange: "0",
            rating: 0,
            dataApplied: Date.now(),
            UserId: globalUserID
        }

        $.ajax("/api/application", {
            type: "POST",
            data: newApp,
        }).then(function (res1) {
            // receives back the user id
            console.log(res1)
            var newCompany = {
                name: company,
                zipCode: "",
                URL: "",
                ApplicationId: res1,
                UserId: globalUserID
            }
            $.ajax("/api/company", {
                type: "POST",
                data: newCompany,
            }).then(function (res2) {
                // receives back the company id
                var newContact = {
                    name: "",
                    email: "",
                    phone: "",
                    type: "",
                    ApplicationId: res1,
                    CompanyId: res2
                }
                $.ajax("/api/contact/new", {
                    type: "POST",
                    data: newContact,
                }).then(function (res3) {
                    console.log(res3)
                    // receives back the company id
                    var newSource = {
                        source: "GitHub",
                        linkToPosting: link,
                        jobID: "",
                        applyType: "",
                        resumeVersion: "",
                        ApplicationId: res1,
                    }
                    $.ajax("/api/source/new", {
                        type: "POST",
                        data: newSource,
                    }).then(function (res4) {
                        console.log(res4)
                    })

                    var newStage = {
                        currentStage: "Application",
                        dateCurrentStage: "",
                        nextStep: "",
                        notes: "",
                        ApplicationId: res1,
                    }
                    $.ajax("/api/stage/new", {
                        type: "POST",
                        data: newStage,
                    }).then(function (res5) {
                        console.log(res5)
                    })

                })
            });

        })

    })

})