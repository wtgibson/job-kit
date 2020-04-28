USE jobkitDB;

INSERT INTO Users (email, password, name, zipCode, jobTitle, createdAt, updatedAt )
VALUES 
    ("joe.smith@email.com", "notSecure", "Joe Smith", "95103","Software Engineer", NOW(), NOW()),
    ("betty.brown@email.com", "surelySimple", "Betty Brown", "94122", "Engineer Manager", NOW(), NOW()),
    ("jojo@email.com","password", "JoJo", "94011", "Full Stack Developer", NOW(), NOW());
INSERT INTO Companies (name, zipCode, URL, createdAt, updatedAt, UserId)
VALUES ("John Crane", "60605", "https://www.johncrane.com/about/press/news/2013/john-crane-moves-headquarters-to-downtown-chicago", NOW(), NOW(), 1);
INSERT INTO Applications (title, type, description, industry, zipCode, salaryRange, rating, createdAt, updatedAt)
VALUES ("Angular Full Stack Software Engineer", "FTE or PTE", "Mean Stack Software Engineer", "Oil and Energy", "94536", 3, 2, NOW(), NOW());


