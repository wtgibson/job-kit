USE jobkitDB;

INSERT INTO Users (email, password, name, zipCode, jobTitle, createdAt, updatedAt)
VALUES 
    ("joe.smith@email.com", "notSecure", "Joe Smith", "95103","Software Engineer", NOW(), NOW()),
    ("betty.brown@email.com", "surelySimple", "Betty Brown", "94122", "Engineer Manager", NOW(), NOW()),
    ("jojo@email.com","password", "JoJo", "94011", "Full Stack Developer", NOW(), NOW());

INSERT INTO Companies (name, zipCode, URL, createdAt, updatedAt, UserId)
VALUES ("John Crane", "60605", "https://www.johncrane.com/about/press/news/2013/john-crane-moves-headquarters-to-downtown-chicago", NOW(), NOW(), 1),
    ("Gorgias", "", "https://www.gorgias.com/", NOW(), NOW(), 1),
    ("Citizens Bank", "", "https://www.citizensbank.com/", NOW(), NOW(), 2),
    ("Recharge Payments", "", "https://rechargepayments.com/about", NOW(), NOW(), 3);



INSERT INTO Applications (title, type, description, industry, zipCode, salaryRange, dateApplied, rating, createdAt, updatedAt, UserId)
VALUES ("Angular Full Stack Software Engineer", "FTE or PTE", "Mean Stack Software Engineer", "Oil and Energy", "94536", 3, "03-02-2020", 2, NOW(), NOW(), 1),
    ("Full-Stack Engineer", "Full Time", "We created the company in Paris and are now a San Francisco based startup with a newly opened Paris office. We're making a SaaS helpdesk that automates a big part of the repetitive customer support tasks. We're close to 2000+ paying companies using our product and growing fast. We’re looking to expand our team and make our product even better!</p>\n<p>If this spiked your interest here’s a bit more info about our stack and how we work at Gorgias:\nThe backend code is mostly written in Python and runs using Flask (REST API) and Celery for all background work. The state is stored in PostgreSQL and RabbitMQ with Redis for ephemeral storage, and finally, everything runs on Kubernetes.</p>\n<p>We have a strong preference for people who worked with high-traffic web applications for the past 3+ years. We're essentially running a distributed system that has lots of moving parts and having a decent amount of experience with this type of system helps a lot!", "Tech", "94103", "5", "04-20-2020", 2, NOW(), NOW(), 1),
    ("Platform Engineer", "Full Time", " We are looking for a Digital Site Reliability Engineering Leader (Platform Engineer) that will drive a team that transforms the way Citizens Bank implements, deploys, supports and operates our digital platform. The focus is on enabling engineering teams with expert guidance and tools to deliver frequent, high quality and reliable components as part of our digital platform. This role would also set strategy and lead our evolution to a continuous delivery world.</p>\n<p>This person would also manage, guide and educate a fixed and a rotating group of platform developers on security, automation, and cloud architecture/technology. This person will work closely with security, Infrastructure, Risk, Middleware, and other areas of the company to ensure continuous delivery and DevOps are influenced throughout the value chain", "Finance", "02911", "0", "04-01-2020", 4, NOW(), NOW(), 2),
    ("Software Development Mangare, Platform Servers (Remote)", "Full Time", "With over 10,000 online merchants launching subscriptions and over 1,000,000 subscribers powered by ReCharge, we have a lot of store owners to support. Our mission to make repeat orders easier began five years ago as a bootstrapped startup and today we're at the forefront of recurring billing software with over 150 remote-first employees around the globe processing tens of millions of dollars in sales every week.", "Finance", "09234", "0", "04-01-2020", 4, NOW(), NOW(), 3);

INSERT INTO Sources (source, linkToPosting, jobId, applyType, resumeVersion, createdAt, updatedAt, ApplicationId)
VALUES ("LinkedIn", "https://www.mysqltutorial.org/mysql-insert-into-select/", "kjodimkojeioralsd", "LinkedIn OneClick", "LinkedIn Resume", NOW(), NOW(), 1),
    ("GitHub", "https://jobs.github.com/positions/051f00e9-068c-47b8-a85a-674a626eff17", "051f00e9-068c-47b8-a85a-674a626eff17","GitHub Apply", "verFSD", NOW(), NOW(), 2),
    ("GitHub", "https://jobs.github.com/positions/010f8467-ceb4-421f-9262-4dc8521644ce", "010f8467-ceb4-421f-9262-4dc8521644ce", "<a href=\"https://jobs.citizensbank.com/job/johnston/platform-engineer/288/16034631\">https://jobs.citizensbank.com/job/johnston/platform-engineer/288/16034631</a>", "verFSD", NOW(), NOW(), 2),
    ("GitHub", "https://jobs.github.com/positions/cf2642a2-e826-484b-8c46-69a217e6d290", "cf2642a2-e826-484b-8c46-69a217e6d290", "GitHub Apply", "verFSD", NOW(), NOW(), 3);

INSERT INTO Stages (currentStage, dateCurrentStage, nextStep, notes, createdAt, updatedAt, ApplicationId)
VALUES ("Applied", "03-20-2020", "Check back on 04-01-2020", "This is a long ass string", NOW(), NOW(), 1),
    ("Applied", "03-20-2020", "Check back on 04-01-2020", "PRAY - PRAY - PRAY", NOW(), NOW(), 2),
    ("Recruiter Interview", "03-25-2020", "Check back with Recruiter on 04-03,2020", "Insert all the notes received from the recruiter", NOW(), NOW(),2),
    ("Applied", "04-02-2020", "Next Step", "notes", NOW(), NOW(), 3),
    ("Applied", "04-01-2020", "Next Step", "notes", NOW(), NOW(), 4),
    ("Recruiter Interview", "04-07-2020", "What's Next", "Notes from the Interview", NOW(), NOW(), 4),
    ("1st Round", "04-16-2020", "Prepare for 2nd Round", "Notes and Learning from 1st Round", NOW(), NOW(), 4);

INSERT INTO Contacts (name, email, phone, type, createdAt, updatedAt, ApplicationId, CompanyId)
VALUES ("James Brown", "james.brown@jb.com", "5551211212", "Recruiter", NOW(), NOW(), 1, 1),
    ("George Costanza", "george@costanza.com", "32125553100", "Recruiter", NOW(), NOW(), 2, 2),
    ("Kramer", "kramer@funny.com", "2125553200", "Hiring Manager", NOW(), NOW(), 2, 2),
    ("Bernadette", "bernadette@bbt.com", "5555555555", "Recruiter", NOW(), NOW(), 3, 3),
    ("Sheldon", "sheldon@bbt.com", "1234567890", "Hiring Manger", NOW(), NOW(), 3, 3);
