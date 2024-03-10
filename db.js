import mysql from "mysql";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create a MySQL connection using environment variables
export const db = mysql.createConnection(process.env.DATABASE_URL);

// Create a MySQL connection pool using environment variables
const pool = mysql.createPool(process.env.DATABASE_URL);

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
