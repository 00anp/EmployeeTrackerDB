USE employee_trackerDB;

INSERT INTO department (name, budget)
VALUES ('Accounting', 1000000),
       ('Marketing', 75000),
       ('Collections', 300000),
       ('Quotes', 300000),
       ('Sales', 50000);

INSERT INTO roles (title, salary, department_id)
VALUES ('Accountant', 1000000, 1),
       ('Market Researcher', 75000, 2),
       ('Collections Agent', 100000, 3),
       ('QBS', 150000, 4),
       ('Outside Sales', 50000, 5);

INSERT INTO employee (first_name, last_name, department, salary, roles_id, manager_id)
VALUES ('Clark', 'Kent', 'Accounting', 1000000, 1, 1),
       ('Diana', 'Prince', 'Marketing', 75000, 2, 1),
       ('Jason', 'Todd', 'Collections', 100000, 3, 1),
       ('Richard', 'Grayson', 'Collections', 100000, 3, 1),
       ('Arthur', 'Curry', 'Quotes', 100000, 4, 1),
       ('Hal', 'Jordan', 'Quotes', 100000, 4, 1),
       ('Barbara', 'Gordon', 'Collections', 100000, 3, 1),
       ('Barry', 'Allen', 'Sales', 100000, 5, 1),
       ('Bart', 'Allen', 'Sales', 200000, 5, 1);

INSERT INTO manager (id, manager_name)
VALUES (1, 'Bruce Wayne');


SELECT * FROM employee;
SELECT * FROM roles;
SELECT * FROM department;
SELECT * FROM manager;  