
$(function(){

    $.ajax("/jobs",{
        method: "GET"
    }).then(function(data){
        var jobH2 = $("<h2>Here are exciting jobs from Github</h2>");
        $("#attach").append(jobH2)
        for(let i =0; i<data.length; i++){
            var el = data[i];
            var div = $("<div></div>")
            $(jobH2).append(div)
           
            $(div).data("id",`${el.id}`);
            $(div).append(`<p>${el.title}</p>`);
            $(div).append(`<p>${el.company}</p>`);
            $(div).append(`<p>${el.location}</p>`);
            $(div).append(`<p>${el.how_to_apply}</p>`);
            $(div).append(`<a href="${el.url}" target="_blank">link</a>`);
            $(div).append(`<img src="${el.company_logo}" alt="company logo"/><hr>`); 
        }
    })
});