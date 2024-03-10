
import mysql from "mysql";

const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
};


const pool = mysql.createPool(dbConfig);

export const db = pool;

  pool.getConnection((err, connection) => {
    if (err) {
      throw err;
    }
  
    connection.query("ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Pokemonlake212'", (err, result) => {
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
