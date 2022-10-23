INSERT INTO department (name)
VALUES ("Accounting"),
       ("Research and Development"),
       ("Public Relations"),
       ("Information Technology");

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 6000.00, 1),
       ("Data Analyst", 6000.00, 2),
       ("Programmer", 9000.00, 2),
       ("Information Technology Tech", 7000.00, 4),
       ("Public Relations Advisor", 6000.00, 3),
       ("Chief Financial Officer", 10000.00, 1 ),
       ("Chief Information Officer", 10000.00, 4),
       ("Chief Operations Officer", 10000.00, 3);
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Peter", "Zimmer", 7, null),
       ("Jessica", "Atell", 6, null),
       ("Jesse", "McDonald", 8, null),
       ("John", "Doe", 1, 2),
       ("Jim", "Thorne", 4, 1),
       ("Sarah", "Lee", 4, 1),
       ("Jane", "Doe", 5, 3),
       ("Brent", "Johnson", 3, 2),
       ("Zach", "Black", 2, 2);