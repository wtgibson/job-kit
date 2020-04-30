$(function () {
    console.log(`loading using the profile data using this id: ${globalUserID}`)
    $.ajax("/api/user/" + globalUserID, {
        type: "GET",
    }).then(function (data) {

        $("#user-profile").append(data)
    })

    $(document).on("click", ".profile-save", function () {
        event.preventDefault(event)
        var zip = $("#prof-zip").val().trim()
        var name = $("#prof-name").val().trim()
        var job = $("#prof-job").val().trim()

        var userUpdate = {
            name: name,
            jobTitle: job,
            zipCode: zip
        }
        $.ajax("/api/user/" + globalUserID, {
            type: "PUT",
            data: userUpdate,
        }).then(function (data) {
            location.reload()
        })
    })

})