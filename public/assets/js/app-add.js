$(function () {
    console.log("is thus thing on")

    $("#app-add").on("click", function (event) {
        event.preventDefault();

        console.log("clicked to submit app")

        var newApp = {
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

        console.log(`Trying to apply with the following object ${JSON.stringify(newApp)}`)
        $.ajax("/api/application", {
            type: "POST",
            data: newApp,
        }).then(function (res1) {
            // receives back the user id
            console.log(res1)
            var newCompany = {
                name: $("#comp-name").val(),
                zipCode: $("#comp-zipCode").val(),
                URL: $("#comp-link").val(),
                ApplicationId: res1,
                UserId: globalUserID
            }
            $.ajax("/api/company", {
                type: "POST",
                data: newCompany,
            }).then(function (res2) {
                // receives back the company id
                var newContact = {
                    name: $("#cont-name").val(),
                    email: $("#cont-email").val(),
                    phone: $("#cont-phone").val(),
                    type: $("#cont-type").val(),
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
                        source: $("#src-source").val(),
                        linkToPosting: $("#src-posting").val(),
                        jobID: " ",
                        applyType: $("#src-applyType").val(),
                        resumeVersion: $("#src-resume").val(),
                        ApplicationId: res1,
                    }
                    $.ajax("/api/source/new", {
                        type: "POST",
                        data: newSource,
                    }).then(function (res4) {
                        console.log(res4)
                    })

                    var newStage = {
                        currentStage: $("#stgs-current").val(),
                        dateCurrentStage: $("#stgs-dateOfStage").val(),
                        nextStep: $("#stgs-nextStep").val(),
                        notes: $("#stgs-notes").val(),
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