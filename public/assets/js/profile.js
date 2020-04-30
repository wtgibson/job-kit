$(function () {
    console.log(`loading using the profile data using this id: ${globalUserID}`)
    $.ajax("/api/user/"+globalUserID, {
        type: "GET",
    }).then(function (data) {
        
        $("#user-profile").append(data)
    })

})