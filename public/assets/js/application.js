$(function () {
    $.ajax("/api/user/1/application/all", {
        type: "GET"
    }).then(function (resp) {
        // console.log(resp)
        $("#app-append").append(resp)
        // $(document).html(resp)
    })

})