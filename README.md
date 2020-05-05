# JobKit
https://job-kit.herokuapp.com

With today’s competitive job market, many applicants need to apply to an ever increasing number of roles to ultimately land the position they want.   

This process can be arduous over the course of several months so applicants can often lose track of useful information or forget specific details related to a job if they don’t hear back from a company right away.   

JobKit was created to organize all of this information in one place for users to leverage and take a more active role in managing their job hunt, ensuring to follow up with the roles they’re the most excited about among many
JobKit allows you to actively track job applications and job opportunities you are interested in acquiring.

JobKit is a Full Stack Application utilizing MySQL as the database to store the application details such as multiple contacts and stages of the application process so you never lose the information you receive from the recruiter and hiring company.  Express-Handlebars enables the application to display the Job Opportunities and Applications effecitvely on the browser page.

## Site Image
![site](public/assets/images/screenshots/applications-tracked.jpg)

## Table of Contents

- [Technologies Used](#Technologies-Used)
- [Learning Points](#Learning-Points)
- [Use](#Use)
- [Installation](#Installation)
- [Code Snippets](#Code-Snippets)
- [Usage](#Usage)
- [Acknowledgements](#Acknoledgements)
- [Authors](#Authors)

## Technologies Used
- Sequelize - used to model, store and retrieve data
- MySQL - used to track application details
- UIKIT - used to build a beautiful application
- Firebase Authentication - used to authentication users upon login
- Express-Handlebars - used as the templating system to dynamically generate the DOM
- Git - version control system for tracking changes to code
- Github - to host the repository
- Axios - Promise based client for node.js
- Heroku - to host the deployed site
- Express - minimal and flexible web application framework
- Nodejs - JavaScript runtime built on Chrome's V8 JavaScript engine
- JavaScript - JavaScript is a prototype-based object-oriented program language 
- jQuery - JavaScript library designed to simplify HTML DOM tree traversal and manipulation.
- GitHub API - Job Search

## Learning Points
- Utilizing Agile developement, the team had a Full Stack MVP up and running in 2 days.  The team leared that the benefit of Agile development.  With an operating MVP in 2 days, the entire team could see each goal and implemented minor working updates frequently.

- Integrating Handlebars into the application framework, required some learning to access dynamically generated elements with UIKit and Sequelize generated data.

- Implementing a client side authentication tool, Firebase, we learned the value of writing data to the sessionStorage to store and pass information between DOM renderings for access to information on the server's database.  We additionally learned the importance of logging out to remove the sessionStorage.

### Modularizing functions
The team learned the value of modularizing functions so they can be used for multiple functions enabled the team to maintain more DRY programming practices and utlize functions for multiple purposes.  The following snippet is used to take Sequelized data from the MySql database and parse the information into a format for displaying, Applications and the details for a single Application.

```
module.exports = function renderApplications(applications, res, partial) {
    
    if (partial === undefined) {
        return res.json(applications);
    }
    var newApplications = applications;

    // If a single object add to an array
    if (!Array.isArray(applications)) {
        newApplications = [applications];
    }

    var arrOfObjs = newApplications.map(element => ({
        id: element.dataValues.id,
        title: element.dataValues.title,
        type: element.dataValues.type,
        industry: element.dataValues.industry,
        zipCode: element.dataValues.zipCode,
        description: element.dataValues.description,
        salaryRange: element.dataValues.salaryRange,
        dateApplied: element.dataValues.dateApplied,
        rating: element.dataValues.rating,
        companyObj: element.dataValues.Company,
        contactObj: element.dataValues.Contacts,
        stageObj: element.dataValues.Stages,
        sourceObj: element.dataValues.Sources

    }));

    var hbsObj = {
        layout: false,
        applications: arrOfObjs
    }

    res.render(partial, hbsObj);
```

## Dependencies
```
axios
express
express-handlebars
firebase authentication
mysql
sequelize
```
## Usage
Click the [JobKit](https://job-kit.herokuapp.com) link to go to the website.
Signup, Login, and Complete your Profile.
Click on the Jobs link in the menu to view GibHub's Job Search. Click Details to view details, Link to Posting to open the GitHub job page or Add Application.
The Following GIF will demonstrate how to edit an existing application.

![Site](public/assets/images/screenshots/application-details-edit.gif)

## Authors
[GitHub](https://github.com/analoo) Ana Medrano 
<img src='https://avatars3.githubusercontent.com/u/8609011?v=4' alt = "my-avatar" style = "width: 40px; border-radius: 15px;"/>    
[GitHub](https://github.com/nadineb1160) Nadine Bundschuh
<img src="https://avatars0.githubusercontent.com/u/23265256?v=4" alt = "Nadine's avatar" style = "width: 40px; border-radius: 15px;"/>   
[GitHub](https://github.com/wtgibson) Will Gibson 
<img src="https://avatars3.githubusercontent.com/u/61765020?v=4" alt = "Will's avatar" style = "width: 40px; border-radius: 15px;"/>   
[GitHub](https://github.com/chindowns) Michael Downs 
<img src="https://avatars3.githubusercontent.com/u/61262454?v=4" alt = "Michael's avatar" style = "width: 40px; border-radius: 15px;"/>

