USE employees_DB;

INSERT INTO department (name)
VALUES ('Sales');
INSERT INTO department (name)
VALUES ('Engineering');
INSERT INTO department (name)
VALUES ('Finance');
INSERT INTO department (name)
VALUES ('Legal');

INSERT INTO role (title, salary, deparment_id)
VALUES ('Sales Lead, 100000, 1');
INSERT INTO role (title, salary, deparment_id)
VALUES ('Lead Engineer, 150000, 2');
INSERT INTO role (title, salary, deparment_id)
VALUES ('Software Engineer, 120000, 3');
INSERT INTO role (title, salary, deparment_id)
VALUES ('Accountant, 125000, 4');
INSERT INTO role (title, salary, deparment_id)
VALUES ('Legal Team Lead, 250000, 4');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, 3);
NSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Mike', 'Chan', 2, 1);
NSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Ashley', 'Rodriguez', 3, NULL);
NSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Kevin', 'Tupik', 4, 3);
NSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Malia', 'Brown', 5, NULL);
NSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Sarah', 'Lourd', 2, NULL);
NSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Tom', 'Allen', 4, 7);
NSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Christian', 'Eckenrode', 1, 2);