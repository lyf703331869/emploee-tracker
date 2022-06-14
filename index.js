// Dependencies
const fs = require("fs");
const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const app = express();
const cTable = require("console.table");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database

const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the employees_db database.`)
);

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "list",
        message: "What would you like to do?",
        default: "Use arrow keys",
        choices: [
          "View All Employees",
          "View All Employees By Department",
          "View All Employees By Manager",
          "Add Employee",
          "Remove Employee",
          "Update Employee Role",
          "Update Employee Manager",
        ],
      },
    ])
    .then((userChoice) => {
      switch (userChoice.list) {
        case "View All Employees":
          let sql = `SELECT employee.id, employee.first_name, employee.last_name,role.title, department.name, role.salary, employee.manager_id FROM department JOIN role ON department.id = role.department_id JOIN employee ON role.id = employee.role_id ORDER BY employee.id ASC;`;
          db.query(sql, (err, result) => {
            if (err) {
              console.log(err);
            }
            console.table(result);
            start();
          });
          break;
        case "View All Employees By Department":
          start();
          break;
        case "View All Employees By Manager":
          start();
          break;
        case "Add Employee":
          start();
          break;
        case "Remove Employee":
          start();
          break;
        case "Update Employee Role":
          start();
          break;
        default:
          start();
      }
    });
}

/*

*/

start();
