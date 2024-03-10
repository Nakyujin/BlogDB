
import mysql from "mysql";

const dbConfig = {
    host: "142ea3db60a8de72c9bad5104fe37c55",
    user: "5db2e2c143966a09398cd0f75e3532c0",
    password: "253414796f98b92ecd92330bd125c596",
    database: "577ea0df49e53d99dedf75fcc8645753"
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
