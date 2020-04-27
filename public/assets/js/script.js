
$(function(){

    var globalUserId;
    // login function
    $("#login").on("click", function(event){
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

                console.log("You send me the user id " + data)

                console.log("You just tried to log in!")
            }
        );
    })

    // function for saving job data
    $(document).on("click", ".link-to-ext", function(){
        event.preventDefault();
        var id = $(this).data("job-id"); 
        console.log(`You clicked on this role to apply:
        $("div").data("job-id)`)
    })



});