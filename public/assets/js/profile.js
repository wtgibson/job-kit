$(function () {
    console.log(`loading using the profile data using this id: ${globalUserID}`)
    $.ajax("/api/user/" + globalUserID, {
        type: "GET",
    }).then(function (data) {

        $("#user-profile").append(data)
    })

    $(document).on("click", ".profile-save", function () {
        event.preventDefault(event)

        console.log("you clicke on it!")
        var zip = $("#prof-zip").text()
        var name = $("#prof-name").text()
        var job = $("#prof-job").text()

        var userUpdate = {
            name: name,
            jobTitle: job,
            zipCode: zip
        }

        console.log(JSON.stringify(userUpdate))

        $.ajax("/api/user/" + globalUserID, {
            type: "PUT",
            data: userUpdate,
        }).then(function (data) {
            console.log(data);
            location.reload()
    })
    })

})