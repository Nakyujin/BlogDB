import { db } from "../db.js";

export const loginUser = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const query = 'SELECT * FROM Users WHERE Username = ? AND Password = ?';
      db.query(query, [username, password], (err, result) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }
  
        if (result.length === 0) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
  
        return res.status(200).json({ message: 'Login successful' });
      });
    } catch (error) {
      console.error('Error logging in:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };