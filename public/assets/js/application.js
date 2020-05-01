$(function () {
    // import { userObj } from 'userId.js'
    let globalUserID = sessionStorage.getItem('uuid')
    console.log(`loading using the object id: ${globalUserID} `)
   
    $.ajax(`/api/user/${globalUserID}/application/all`, {
        type: "GET"
    }).then(function (resp) {
        // console.log(resp)
        $("#app-append").append(resp)
        // $(document).html(resp)
    });

    $(document).on("click", ".edit-app", function(event){
        event.preventDefault();
        var id = $(".edit-app").data("appid");
        sessionStorage.setItem('caid', id);
        window.location.replace("/edit")
        
    });

    $(document).on("click", ".delete-app", function(event){
        event.preventDefault();
        var id = $(".delete-app").data("appid");

        $.ajax(`/api/application/${id}`, {
            type: "DELETE"
        }).then(function (resp){
            window.location.reload()
        })
        
    });
  

    $("#field").on("change", function(event) {
        const field = event.target.value;
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

})