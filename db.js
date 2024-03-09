
import mysql from "mysql"


export const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"Pokemonlake212",
    database:"Blogdb"
})

const pool = mysql.createPool({
    connectionLimit: 10, 
    host: 'localhost',
    user: 'root',
    password: 'Pokemonlake212',
    database: 'Blogdb'
  });

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
