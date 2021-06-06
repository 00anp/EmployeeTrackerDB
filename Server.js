const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '@1929saBIna!',
    database: 'employee_trackerDB',
});

connection.connect((err) => {
    if (err) throw err;
    runEmployeeSearch();
  });
  
  const runEmployeeSearch = () => {
    inquirer
      .prompt({
        name: 'action',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices: ["View all departments.", "View all employees.", "View all employees by department.", "View all employees by manager.", "Add employee.", "Remove employee.", "Update employee role.", "Update employee manager.", "End session."],
      })
      .then((answer) => {
        switch (answer.action) {
          case 'View all departments.':
            viewDepartments();
            break;
  
          case 'View all employees.':
            viewEmployees();
            break;
  
          case 'View all employees by department.':
            viewEmployeesByDeparment();
            break;
  
          case 'View all employees by manager.':
            viewEmployeesByManager();
            break;
  
          case 'Add employee.':
            addEmployee();
            break;
          
          case 'Remove employee.':
            removeEmployee();
            break;

          case 'Update employee role.':
            updateEmployeeRole();
            break;
            
          case 'Update employee manager.':
            updateEmployeeManager();
            break;
            
          case "End session.":
            endSession();
            break;
  
          default:
            console.log(`Invalid action: ${answer.action}`);
            break;
        }
      });
  };
  
  const viewDepartments = () => {
        connection.query("Select id, dept_name, utilized_budget FROM department", (err, res) => {
          if (err) throw err;
          console.table('Departments', res);
          runEmployeeSearch();
        });
      };
    
  const viewEmployees = () => {
    let query = "SELECT employee.id, employee.first_name, employee.last_name, department.name, employee.salary, roles.title, manager.manager_name ";
    query += "FROM employee "; 
    query += "INNER JOIN department ON employee.department = department.name "; 
    query += "INNER JOIN roles ON department.id = roles.department_id ";
    query += "LEFT JOIN manager ON employee.manager_id = manager.id ";
    
    connection.query(query, (err, res) => {
        console.table('All Employees', res);
        runEmployeeSearch()
      })

  };
    
  
  const viewEmployeesByDeparment = () => {
    let query = "SELECT department.name, employee.id, employee.first_name, employee.last_name ";
    query += "FROM department ";
    query += "INNER JOIN employee ON employee.department = department.name ";
    query += "ORDER BY department.name";
    
    connection.query(query, (err, res) => {
      console.table('Employees By Department', res);
      runEmployeeSearch()
      })    
  };
  
  const viewEmployeesByManager = () => {
    let query = "SELECT manager.id, manager.manager_name, employee.first_name, employee.last_name ";
    query += "FROM manager ";
    query += "INNER JOIN employee ON manager.id = employee.manager_id ";
    query += "ORDER BY manager.manager_name";
    connection.query(query, (err, res) => {
      console.table('Employees By Manager', res);
      runEmployeeSearch()
      })
  };
  
  const addEmployee = () => {
    inquirer
      .prompt([
        {
        name: 'NewEmployeeFirstName',
        type: 'input',
        message: "What is the new employee's first name? (Required.)"
      },
      {
        name: 'NewEmployeeLastName',
        type: 'input',
        message: "What is the new employee's last name? (Required.)"
      },
      {
        name: 'NewEmployeeDepartment',
        type: 'list',
        message: "What is the new employee's department? (Required.)",
        choices: ['Accounting', 'Marketing', 'Collections', 'Quotes', 'Sales']
      },
      {
        name: 'NewEmployeeSalary',
        type: 'input',
        message: "What is the new employee's Salary? (Required.)"
      },
      {
        name: 'NewEmployeeManager',
        type: 'Choices',
        message: "Who is the new employee's manager? (Required.)",
        choices: ['Bruce Wayne']
      },
      {
        name: 'NewEmployeeRole',
        type: 'Choices',
        message: "What is the new employee's role? (Required.)",
        choices: ['Accountant', 'Market Researcher', 'Collections Agent', 'QBS', 'Outside Sales']
      },
    ])
  
      .then((answer) => {

        connection.query(query, 
          "INSERT INTO employee SET ?",
        {
          first_name: answer.NewEmployeeFirstName,
          last_name: answer.NewEmployeeLastName,
          department: answer.NewEmployeeDepartment,
          salary: answer.NewEmployeeSalary,
          roles_id: NewEmployeeRole,
          manager_id: NewEmployeeManager
         }, (err, res) => {
          if (err) throw err;
          console.log(res.affectedRows + " employee added!\n");
          runEmployeeSearch();
        });
      });
  };

const endSession = () => {
    console.log("Session ended.");
    connection.end();
};
