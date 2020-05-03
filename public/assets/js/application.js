$(function () {
    // import { userObj } from 'userId.js'
    let globalUserID = sessionStorage.getItem('uuid')
    let appID = sessionStorage.getItem('caid');
    let field;

    // on page load, there is an api call made to applications and the response is appended to the page
    $.ajax(`/api/user/${globalUserID}/application/all`, {
        type: "GET"
    }).then(function (res) {
        $("#app-append").append(res)
    });

    // Edit and Delete Application, Contact and Source
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

    // does this still in use?
    $(document).on("click", "#details-btn", function (event) {
        // event.preventDefault();
        var id = event.target.value;;

        $.ajax(`/api/application/${id}`, {
            type: "GET"
        }).then(function (res) {
            // window.location.reload()
            $("#details-modal").append(res);
        })

    });

    // --------------------  add, edit, save, delete Contact Code  -------------------- 

    // unhides add contact form with one button click
    $(document).on("click", ".add-contact", function (event) {
        event.preventDefault();
        var id = $(".add-contact").data("appid")
        $(`#add-form-${appID}`).removeClass("uk-hidden")
    })

    // contact save that makes ajax call to POST contact
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
        $.ajax("/api/contact/new", {
            type: "POST",
            data: newContact,
        }).then(function (res1) {
            // receives back the contact id to make a second call for rendered data
            let id = res1
            $.ajax(`/api/contact/${id}`, {
                type: "GET",
            }).then(function (res2) {
                $(`#contacts-append-table-${appID}`).append(res2)
            })

        })
    })

    // deletes contact
    $(document).on("click", ".contact-delete", function (event) {
        event.preventDefault();
        var id = $(this).data("contactid");
        $(`#contact-${id}`).remove()
        $.ajax(`/api/contact/${id}`, {
            type: "DELETE",
        }).then(function (res3) {
            
        })
    })


    // --------------------  add, edit, save, delete stage Code  -------------------- 


    $(document).on("click", ".add-stage", function (event) {
        event.preventDefault();
        var id = $(".add-stage").data("appid")
        $(`#add-stage-${appID}`).removeClass("uk-hidden")
    })

    $(document).on("click", ".stage-save", function (event) {
        event.preventDefault();
        $(`#add-stage-${appID}`).addClass("uk-hidden")

        var newStage = {
            currentStage: $(`#add-stage-stage-${appID}`).val(),
            dateCurrentStage: $(`#add-stage-date-${appID}`).val(),
            nextStep: $(`#add-stage-next-${appID}`).val(),
            notes: $(`#add-stage-notes-${appID}`).val(),
            ApplicationId: appID,
        }
        $.ajax("/api/stage/new", {
            type: "POST",
            data: newStage,
        }).then(function (res5) {
            $(`#stages-append-table-${appID}`).append(res5)
            console.log(res5)
        })
    })

    $(document).on("click", ".stage-delete", function (event) {
        event.preventDefault();
        var id = $(this).data("stageid");
        $.ajax(`/api/stage/${id}`, {
            type: "DELETE",
        }).then(function (res3) {
            console.log(res3)
            $(`#stage-${id}`).remove()
        })
    })


    $(document).on("click", ".details-link-modal", function (event) {
        event.preventDefault();
        var applicationID = $(this).data("id")
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
                console.log(res)
                $("#filter").append(res);
            });
        }
        else if (field === "source" || field === "resumeVersion" || field === "applyType") {
            $.ajax(`/api/user/${globalUserID}/application/join/source/${field}`, {
                type: "GET"
            }).then(function (res) {
                console.log(res);
                $("#filter").append(res);
            });

        }
        else if (field === "currentStage") {
            $.ajax(`/api/user/${globalUserID}/application/join/stage/${field}`, {
                type: "GET"
            }).then(function (res) {
                console.log(res);
                $("#filter").append(res);
            });
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
            $.ajax(`/api/user/${globalUserID}/application/filter/source/${filter}`, {
                type: "GET"
            }).then(function (res) {
                $("#app-append").append(res)
            })
        }
        else if (field === "applyType") {
            $.ajax(`/api/user/${globalUserID}/application/filter/applyType/${filter}`, {
                type: "GET"
            }).then(function (res) {
                $("#app-append").append(res)
            })
        }
        else if (field === "resumeVersion") {
            $.ajax(`/api/user/${globalUserID}/application/filter/resumeVersion/${filter}`, {
                type: "GET"
            }).then(function (res) {
                $("#app-append").append(res)
            })
        }
        else if (field === "currentStage") {
            $.ajax(`/api/user/${globalUserID}/application/filter/currentStage/${filter}`, {
                type: "GET"
            }).then(function (res) {
                $("#app-append").append(res)
            })
        }
    });

    // Click Reset Filter Button
    $("#reset-btn").on("click", function (event) {
        // event.preventDefault();
        window.location.reload()
        // $.ajax(`/api/user/${globalUserID}/application/all`, {
        //     type: "GET"
        // }).then(function (res) {
        //     $("#app-append").append(res);
        // });
    });

}); 