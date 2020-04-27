USE jobkitDB;

INSERT INTO users (email, password, name, zipCode, jobTitle, createdAt, updatedAt )
VALUES 
    ("joe.smith@email.com", "notSecure", "Joe Smith", "95103","Software Engineer", NOW(), NOW()),
    ("betty.brown@email.com", "surelySimple", "Betty Brown", "94122", "Engineer Manager", NOW(), NOW()),
    ("jojo@email.com","password", "JoJo", "94011", "Full Stack Developer", NOW(), NOW());


INSERT INTO companies (name, zipCode, URL, createdAt, updatedAt, UserId)
VALUES ("John Crane", "60605", "https://www.johncrane.com/about/press/news/2013/john-crane-moves-headquarters-to-downtown-chicago", NOW(), NOW(), 1);
INSERT INTO application (title, description, indsutry, zipCode, salaryRante, rating, createdAt, updatedAt)
VALUES
    ((SELECT id FROM application WHERE CompanyId = id),"Angular Full Stack Software Engineer", "Mean Stack Software Engineer", "Oil and Energy", "94536", "not provided", "2", NOW(), NOW());

