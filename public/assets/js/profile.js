
$(function () {
    // sets the global user id from the session storage
    let globalUserID = sessionStorage.getItem('uuid');
    console.log(`loading using the profile data using this id: ${globalUserID}`)

    $.ajax("/api/user/" + globalUserID, {
        type: "GET",
    }).then(function (data) {
        $("#user-profile").append(data)
    })

    $(document).on("click", ".profile-save", function () {
        event.preventDefault(event)
        // var zip = $("#prof-zip").val().trim()
        var name = $("#prof-name").val().trim()
        var job = $("#prof-job").val().trim()
        var language = $("#prof-lang").val().trim()
        var github = $("#prof-gh-name").val().trim()

        sessionStorage.setItem('clid', language);

        var userUpdate = {
            name: name,
            jobTitle: job,
            // zipCode: zip,
            github: github,
            codingLanguage: language
        }
        $.ajax("/api/user/" + globalUserID, {
            type: "PUT",
            data: userUpdate,
        }).then(function (data) {
            location.reload()
        })
    })


});