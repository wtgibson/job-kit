
$(function(){

    var globalUserId;
    globalUserId = 1;
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

    $("#applications-nav").on("click", function(){
        console.log("You updated the data")
        $.ajax("/api/user/1/application/all"), {
            type: "GET"
        }.then(function(data){
            console.log(JSON.stringify(data))
        })
    })

    $(document).on("click", ".link-to-ext", function(){
        event.preventDefault();
        var id = $(this).data("job-id"); 
        var newApp = {
            title: $(`title-${id}}`).text(),
            description: $(`desc-${id}}`).text(),
            industry: "None",
            zipCode: "None",
            salaryRange: 0,
            rating: 0,
            createdAt: 0,
            updatedAt: 0
        }
        $.ajax("/api/application"),{
            type: "POST",
            data: newApp,
        }.then(function (){
            console.log("successfully added the app")
        })

        var newCompany = {
            name: $(`company-${id}`).text(),
            zipCode: "None",
            url: $(`company-${id}`).attr("href"),
            createdAt: 0,
            updatedAt: 0,
            UserID: globalUserId
        }
        $.ajax("/api/company", {
            type: "POST",
            data: newCompany
        }).then(function(){
            console.log("Successfully added the company")
        })

        var newSources = {
            source: "Github",
            linkToPosting: $(this).attr("href"),
            jobId: id,
            applyType: "none",
            resumeVersion: "",
            createdAt: 0,
            updatedAt: 0,
            ApplicationId: "none"
        }

        var 
    })





});