const mysql = require('mysql');

const HOST = 'localhost';
const USER = 'root';
const PASSWORD = '';
const DATABASE = 'diplomnaya_rabota';

const connection = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE
});
 
connection.connect();
 
module.exports = connection;
