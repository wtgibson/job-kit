$(function () {
    // import { userObj } from 'userId.js'
    let globalUserID = sessionStorage.getItem('uuid')
    let appID = sessionStorage.getItem('caid');
    let field;

    $.ajax(`/api/user/${globalUserID}/application/all`, {
        type: "GET"
    }).then(function (res) {
        // console.log(res)

        $("#app-append").append(res)
        // $(document).html(res)
    });

    $(document).on("click", ".edit-app", function (event) {
        event.preventDefault();
        var id = $(this).data("appid");
        sessionStorage.setItem('caid', id);
        window.location.replace("/edit")

    });

    $(document).on("click", ".delete-app", function (event) {
        event.preventDefault();
        var id = $(".delete-app").data("appid");

        $.ajax(`/api/application/${id}`, {
            type: "DELETE"
        }).then(function (res) {
            window.location.reload()
        })

    });

    $(document).on("click", ".add-contact", function (event) {
        event.preventDefault();
        var id = $(".add-contact").data("appid")
        console.log(`I clicke don id #add-form-${appID}`)
        $(`#add-form-${appID}`).removeClass("uk-hidden")
    })

    $(document).on("click", ".contact-save", function (event) {
        event.preventDefault();
        $(`#add-form-${appID}`).addClass("uk-hidden")
        
        var newContact = {
            name: $(`#add-contact-name-${appID}`).val(),
            type: $(`#add-contact-type-${appID}`).val(),
            email: $(`#add-contact-email-${appID}`).val(),
            phone: $(`#add-contact-phone-${appID}`).val(),
            ApplicationId: appID,
        }
        console.log("You tried to add an app!")
        console.log(newContact)
        $.ajax("/api/contact/new", {
            type: "POST",
            data: newContact,
        }).then(function (res3) {
            window.location.reload()
            // receives back the company id

        })
    })

    $(document).on("click", ".details-link-modal", function(event){
        event.preventDefault();
        var applicationID = $(this).data("id")
        console.log(`this is our application ID ${applicationID}`)
        sessionStorage.setItem('caid', applicationID);
        appID = sessionStorage.getItem('caid');

    })


    // Change Field - title, zipcode, etc.
    $("#field").on("change", function (event) {
        field = event.target.value;
        if (field === "0") {
            return
        }
        $("#filter").empty();

        // Filter on Application Field
        if (field === "title" || field === "zipCode" || field === "rating") {
            $.ajax(`/api/user/${globalUserID}/application/${field}`, {
                type: "GET"
            }).then(function (res) {
                $("#filter").append(res);
            })
        }
        else if (field === "source" || field === "resumeVersion") {
            $.ajax(`/api/source/all/${field}`, {
                type: "GET"
            }).then(function (res) {
                $("#filter").append(res);
            })
        }
        else if (field === "currentStage") {
            $.ajax(`/api/stage/all/${field}`, {
                type: "GET"
            }).then(function (res) {
                $("#filter").append(res);
            })
        }

    });

    // Change Filter - "Engineer", "Front-end Developer", etc.
    $("#filter").on("change", function (event) {
        const filter = event.target.value;
        $("#app-append").empty();
        if (filter === "0") {
            return
        }
        else if (field === "title") {
            $.ajax(`/api/user/${globalUserID}/application/filter/title/${filter}`, {
                type: "GET"
            }).then(function (res) {
                console.log("======================")
                console.log(res);
                $("#app-append").append(res)
            })
        }
        else if (field === "zipCode") {
            $.ajax(`/api/user/${globalUserID}/application/filter/zipCode/${filter}`, {
                type: "GET"
            }).then(function (res) {
                $("#app-append").append(res)
            })
        }
        else if (field === "rating") {
            $.ajax(`/api/user/${globalUserID}/application/filter/rating/${filter}`, {
                type: "GET"
            }).then(function (res) {
                $("#app-append").append(res)
            })
        }
        else if (field === "source") {
            $.ajax(`/api/source/filter/sourceType/${filter}`, {
                type: "GET"
            }).then(function (res) {
                $("#app-append").append(res)
            })
        }
        else if (field === "resumeVersion") {
            $.ajax(`/api/user/:userId/source/filter/resumeVersion/${filter}`, {
                type: "GET"
            }).then(function (res) {
                $("#app-append").append(res)
            })
        }
        else if (field === "currentStage") {
            $.ajax(`/api/stage/filter/currentStage/${filter}`, {
                type: "GET"
            }).then(function (res) {
                $("#app-append").append(res)
            })
        }
    });

    // Click Reset Filter Button
    $("#reset-btn").on("click", function (event) {
        event.preventDefault();
        $.ajax(`/api/user/${globalUserID}/application/all`, {
            type: "GET"
        }).then(function (res) {
            $("#app-append").append(res);
        });
    });

}); 