$("#jobSearch").on('submit', function (event) {
    event.preventDefault();
    var locationCity = $('#jobSearch').val().trim();
    console.log(`the city location is ${locationCity}`)
    // $.ajax(`/api/jobs/all/${locationCity}`, {
    //     type: "GET"
    // }).then(function (resp) {
    //     $("#github-jobs").append(resp)
    // })

});