# USER
 CREATE a new
 PUT // use for udpating profile information or removing profile by making the email a Unique placeholder
 PUT login
 GET USER // profile
 GET USERS // DON'T NEED 
 DELETE // DON'T NEED

# APPLICATION
Get all applications for a userid

Get all applications based on the object passed to req.body
    db.Application.get({
    where: req.body}).then(applications=>{res.render("index", applications)});
- all applications for a given db.User.id: "#", && db.Company.name : "name"
- all applications for a given db.User.id

Get one application for a userid and company
    findAll({
        where: company = req.body.company
})

Get one application for a userid and title



