import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { db } from "../db.js";
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const showPosts = async (req, res) => {
    const q = "SELECT * FROM Posts";
    db.query(q, (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        return res.json(data);
    });
};

export const getPost = async (req, res) => {
    const postId = req.params.id;
    const sql = "SELECT * FROM Posts WHERE id = ?";
    
    db.query(sql, [postId], (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (data.length === 0) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json(data[0]);
    });
};

export const addPost = async (req, res, next) => {
  try {
    const { title, bodytext, tag, menusubtitle } = req.body;
    const imgFileName = req.file.filename;

    if (!title || !bodytext || !tag || !menusubtitle || !imgFileName) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const currentDate = new Date().toISOString();
    const postId = uuidv4();

    const newImgFileName = postId + path.extname(imgFileName);
    fs.renameSync(path.join(__dirname, '../uploads', imgFileName), path.join(__dirname, '../uploads', newImgFileName));

    const sql = 'INSERT INTO Posts (title, bodytext, tag, menusubtitle, date, img) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [title, bodytext, tag, menusubtitle, currentDate, newImgFileName], (err, result) => {
      if (err) {
        console.error('Error adding post:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      return res.status(201).json({ message: 'Post added successfully' });
    });
  } catch (err) {
    console.error('Error adding post:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getImage = async (req, res) => {
  try {
    const { id } = req.params;

    const sql = 'SELECT img FROM Posts WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error fetching image:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: 'Image not found' });
      }

      const imgFileName = result[0].img;
      const imagePath = path.join(__dirname, '../uploads', imgFileName);

      res.sendFile(imagePath);
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


