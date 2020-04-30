$(function () {
    // import { userObj } from 'userId.js'
    
    console.log(`loading using the object id: ${globalUserID} `)
   
    $.ajax(`/api/user/${globalUserID}/application/all`, {
        type: "GET"
    }).then(function (resp) {
        // console.log(resp)
        $("#app-append").append(resp)
        // $(document).html(resp)
    })

})