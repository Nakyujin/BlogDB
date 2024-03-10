import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();


export const db = mysql.createConnection({
  connectionLimit: 10,
    host: 'roundhouse.proxy.rlwy.net', 
    port: 30141,
    user: process.env.MYSQLUSER || process.env.MYSQL_USER,
    password: process.env.MYSQLPASSWORD || process.env.MYSQL_PASSWORD,
    database: process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE
});

// Create a MySQL connection pool using environment variables
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "roundhouse.proxy.rlwy.net",
  port: 30141,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  acquireTimeout: 60000 // Set acquire timeout to 60 seconds
});

// Alter the MySQL user if needed
pool.getConnection((err, connection) => {
    if (err) {
        throw err;
    }

    connection.query(`ALTER USER '${process.env.DB_USER}'@'${process.env.DB_HOST}' IDENTIFIED WITH mysql_native_password BY '${process.env.DB_PASSWORD}'`, (err, result) => {
        if (err) {
            throw err;
        }
        console.log('User altered successfully');

        connection.release();

        pool.end((err) => {
            if (err) {
                throw err;
            }
            console.log('Connection pool closed');
        });
    });
});
