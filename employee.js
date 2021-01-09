const mysql = require("mysql2");
var inquirer = require('inquirer');


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Maryland123!",
    database: "employee_trackerdb"
});




connection.connect(async (err) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    await start();
    connection.end
});


async function start() {
    const { choice } = await inquirer.prompt({
        name: "choice",
        type: "rawlist",
        message: "What would you like to do?",
        choices: ["View Employee", "View Department", "View Role", "View Manager",
            "Add employee", " Add Role", " Add Department"],

    })
    console.log(choice)
    switch (choice) {
        case "View Employee":
            viewEmployee();
            break;
    }
    switch (choice) {
        case "View Department":
            ViewDepartment();
            break;
    }
    switch (choice) {
        case "View Role":
            ViewRole();
            break;
    }
    switch (choice) {
        case "Add employee":
            addEmployee();
            break;
    }switch (choice) {
        case "View Add Role":
            addRole();
            break;
    }switch (choice) {
        case "Add department":
            addDepartment();
            break;
    }
}




async function viewEmployee() {
    const SQL_STATEMENT = "SELECT * FROM employee";
    const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
    console.table(rows);
    start()
}




async function ViewDepartment() {
    const SQL_STATEMENT = 'SELECT * FROM department';
    const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
    console.table(rows);
    start()
}

async function ViewRole() {
    const SQL_STATEMENT = 'SELECT * FROM role';
    const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
    console.table(rows);
    start()
}


async function addEmployee() {
    let response = await inquirer
        .prompt({
            name: "addEmployee",
            type: "input",
            message: "Which employee would you like to add?"
        });
    var name = response.addEmployee
    addEmployeeName(name);
    async function addEmployeeName(name) {

        console.log(name);
        const SQL_STATEMENT = "INSERT into employee set ?";
        response = await
            connection.promise().query(SQL_STATEMENT, [name]);
        console.log("successfully added")
        start();
    }




}

async function addRole() {
    const SQL_STATEMENT = "SELECT * FROM employee";
    const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
    console.table(rows);
}

async function addDepartment() {
    const SQL_STATEMENT = "SELECT * FROM employee";
    const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
    console.table(rows);
}