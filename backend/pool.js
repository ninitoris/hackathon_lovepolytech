const mysql = require("mysql2");

const pool = mysql.createPool({
    connectionLimit: 5,
    host: "194.58.103.233",
    user: "sammy",
    database: "eskd",
    password: "sammy_password",
    port: 6033
});

module.exports = pool;