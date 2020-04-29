$(function () {
    $.ajax("/api/user/1", {
        type: "GET",
    }).then(function (data) {
        $("#user-profile").append(data)
    })

})