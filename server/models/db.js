const mysql = require("mysql");
const MyJsql = require('my-jsql')
const dbConfig = require("../config/db.config.js");

var connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});
connection.connect();
const jsql = new MyJsql(connection)
module.exports = jsql;