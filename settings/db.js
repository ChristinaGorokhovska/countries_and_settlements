const mysql = require("mysql");
const config = require("../config/config");

const connection = mysql.createConnection({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE,
});

connection.connect((error) => {
    if (error) {
        return console.log("Error with DB connection!" + error);
    } else {
        return console.log("Connected with DB!");
    }
});

module.exports = connection;
