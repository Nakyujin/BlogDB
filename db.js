import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    connectionLimit: 10, 
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    acquireTimeout: 60000 // Timeout set to 60 seconds
});

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
