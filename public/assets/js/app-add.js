$(function () {
    let globalUserID = sessionStorage.getItem('uuid');

    $("#app-add").on("click", function (event) {
        event.preventDefault(event);
        // window.location.replace("/applications")
        var roleType;
        var interest;
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

        // need to check length of zipCode before Submitting
        
        let appZip;
        if($("#app-zipCode").val()==""){
            appZip = "     "
        }
        else{
            appZip = $("#app-zipCode").val()
        }



        console.log(appZip)

        var newApp = {
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
                console.log(res2)

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



            })
        });
    })
})