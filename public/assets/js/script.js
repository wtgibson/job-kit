
$(function(){

    var globalUserId;
    // login function that confirms login and returns global user id
    
    $("#login-button").on("click", function(event){
        event.preventDefault();
        var username = $("#username").val().trim()
        var password = $("#password").val().trim()
        var login = {
            email: username,
            password: password
        }

        $.ajax("/api/login", {
            type: "PUT",
            data: login
        }).then(
            function (data) {
                globalUserId = data;
            }
        );
    })

    // function for saving job data

    $("application-nav").on("click", function(){
        $.ajax("/api/application/all/"+1), {
            type: "GET"
        }.then(function(data){
            console.log(data)
        })
    })

    $(document).on("click", ".link-to-ext", function(){
        event.preventDefault();
        var id = $(this).data("job-id"); 
        console.log(`You clicked on this role to apply:
        ${$("div").data("job-id")}`)
    })





});