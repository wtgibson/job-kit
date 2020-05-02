$( document ).ready(function() {
    let globalUserID = sessionStorage.getItem('uuid')
    console.log(globalUserID)

    $(document).on("click", ".home-page-apps", function(event){
        event.preventDefault();
        console.log("You clicked me!")
        if(!globalUserID == null){
            $("#home-page-apps").attr("href", "/jobs");
        }else{
            $(this).attr("href", "/applications");
        }

        
    });
});