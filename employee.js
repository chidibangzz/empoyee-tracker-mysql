const mysql = require("mysql2");
var inquirer = require('inquirer');


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Maryland123!",
    //Maryland123!
    database: "employee_trackerdb"
});




connection.connect(async (err) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    await start();
});


async function start() {
    const { choice } = await inquirer.prompt({
        name: "choice",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
                    "View Employee", "View Department", "View Role",
                    "Add Employee", "Add Role", "Add Department",
                    "Update Employee By Role",
                    "EXIT"
                ]

    });

    console.log(choice)
    switch (choice) {
        case "View Employee":
            await viewEmployee();
            break;
        case "View Department":
            await viewDepartment();
            break;
        case "View Role":
            await viewRole();
            break;
        case "Add Employee":
            await addEmployee();
            break;
        case "Add Role":
            // TODO
            await addRole();
            break;
        case "Add Department":
            // TODO
            await addDepartment();
            break;
        case "Update Employee By Role":
            // TODO
            await updateEmployeeByRole();
            break;
        default: // EXIT
            return connection.end();
    }

    start();
}




async function viewEmployee() {
    const SQL_STATEMENT = "SELECT * FROM employee";
    const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
    console.table(rows);
}




async function viewDepartment() {
    const SQL_STATEMENT = 'SELECT * FROM department';
    const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
    console.table(rows);
}

async function viewRole() {
    const SQL_STATEMENT = 'SELECT * FROM role';
    const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
    console.table(rows);
}


async function addEmployee() {

    // Get All Roles
    let ROLE_SQL_STATEMENT = "SELECT * FROM role";
    const[roleRows, roleFields] = await connection.promise().query(ROLE_SQL_STATEMENT);

    // Get All Managers
    let EMPLOYEE_SQL_STATEMENT = "SELECT * FROM employee";
    const[managerRows, managerFields] = await connection.promise().query(EMPLOYEE_SQL_STATEMENT);

    let answer = await inquirer
        .prompt([{
            name: "first_name",
            type: "input",
            message: "What is the first name of the employee?"
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the last name of the employee?"
        },
        {
            name: "role_title",
            type: "list",
            message: "Choose employee role?",
            choices: roleRows.map(role => role.title)
        },
        {
            name: "manager_full_name",
            type: "list",
            message: "Who is the employee manager?",
            choices: managerRows.map(manager => `${manager.first_name} ${manager.last_name}`)
        }
    ]);

    
    // Find role ID
    let {id: roleID} = roleRows.find(role => role.title === answer.role_title);
    let {id: managerID} = managerRows.find(manager => `${manager.first_name} ${manager.last_name}` === answer.manager_full_name);


    const SQL_STATEMENT = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";

    response = await connection.promise().query(SQL_STATEMENT, [answer.first_name, answer.last_name, roleID, managerID]);

    console.log("successfully added");

}

async function addRole() {
    let SQL_STATEMENT = "SELECT * FROM department";
    const [departmentRows, fields] = await connection.promise().query(SQL_STATEMENT);
    console.table(departmentRows);

    let answer = await inquirer
        .prompt([{
            name: "roleTitle",
            type: "input",
            message: "Whats the title of the role?"
        },
        {
            name: "salary",
            type: "input",
            message: "Salary?"
        },
        {
            name: "departmentName",
            type: "list",
            message: "Choose Department?",
            choices: departmentRows.map(department => department.name)
        },
        
       
    ]);
    console.log(answer)
    let {id: departmentId} = departmentRows.find(department => department.name === answer.departmentName);
     SQL_STATEMENT = "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)";

    response = await connection.promise().query(SQL_STATEMENT, [answer.roleTitle, answer.salary, departmentId]);

    console.log("successfully added")
}










async function addDepartment() {
    let SQL = "SELECT * from department";
    const [addDepartment, fields] = await connection.promise().query(SQL);

    console.table(addDepartment);
    let answer = await inquirer
        .prompt([{
            name: "addDepart",
            type: "input",
            message: "Which department would you like to add?"
        },
        
    ]);
    console.table(answer)
    const SQL_STATEMENT = "INSERT INTO department (name) VALUES (?)";

    response = await connection.promise().query(SQL_STATEMENT, [answer.addDepart]);

    console.log("successfully added")

}


async function updateEmployeeByRole() {
    let employeeUpdate= "SELECT first_name, last_name FROM employee"
    const[employeeSql, roleFields] = await connection.promise().query(employeeUpdate);
    console.table(employeeSql)
    
    let roleUpdate = "SELECT title FROM role";
    const[roleSql, managerFields] = await connection.promise().query(roleUpdate);
    console.table(roleSql)


    let answer = await inquirer
        .prompt([  {
            name: "employeeUpdater",
            type: "list",
            message: "choose an employee to update?",
            choices: employeeSql.map(employee => `${employee.first_name} ${employee.last_name}`)
            
        }, 
        {
            name: "role_title",
            type: "list",
            message: "Choose a new role title?",
            choices: roleSql.map(Rupdate => Rupdate.title)
        }, 
    ]);

    console.log(answer)
    let {id: newRole} = roleSql.find(Rupdate => Rupdate.title === answer.role_title);
    
    let {id: addEmployee} = employeeSql.find(employee => `${employee.first_name} ${employee.last_name}` === answer.updatedNew);

      employeeUpdate = "INSERT INTO employee (first_name, last_name) VALUES (?,?)";


    response = await connection.promise().query(employeeUpdate, [addEmployee, newRole]);

    console.log("successfully added")



}