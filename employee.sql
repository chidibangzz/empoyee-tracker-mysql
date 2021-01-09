DROP DATABASE IF EXISTS employee_trackerdb;

CREATE database employee_trackerdb;

USE employee_trackerdb;

CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30)NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30)NOT NULL,
    salary DECIMAL NOT NULL,
    department_id int NOT NULL,
    primary key(id)
);

CREATE TABLE employee (
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id int NOT NULL,
    manager_id int NOT NULL,
    primary key(id)
);
INSERT INTO department (name) 
VALUES
    ('SALES'),('FINANCE'),('AUDIT'),
    ('CASH'),('SERVICES'),('TECHNOLOGY');
   
SELECT * FROM department;


INSERT INTO employee (first_name, last_Name, role_id, manager_id) values('Terry', 'Mclaurin',1,71);
INSERT INTO employee (first_name, last_Name, role_id, manager_id) values('London', 'Fletcher',1,72);
INSERT INTO employee (first_name, last_Name, role_id, manager_id) values('Santana', 'Moss',2,98);
INSERT INTO employee (first_name, last_Name, role_id, manager_id) values('Sean', 'Taylor',3,12);
INSERT INTO employee (first_name, last_Name, role_id, manager_id) values('Clinton', 'Portis',4,62);

SELECT * FROM employee;


INSERT INTO role (title, salary, department_id) values('Sales Manager', 77600,1);
INSERT INTO role (title, salary, department_id) values('FINANCE Manager', '89000',2);
INSERT INTO role (title, salary, department_id) values('AUDIT Manager', '120000',3);
INSERT INTO role (title, salary, department_id) values('TECH MANAGER', '350000',6);

SELECT * FROM role;


SELECT title, first_name, last_name
FROM role
left JOIN employee ON role.id = employee.role_id;

SELECT first_name
FROM employee;