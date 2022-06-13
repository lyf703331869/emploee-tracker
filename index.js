// Dependencies
const fs = require("fs");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const app = express();
require("dotenv").config();

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
  console.log(`Connected to the books_db database.`)
);
