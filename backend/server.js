// backend/server.js
import express from 'express';
import { Pool } from "pg";

const app = express();
const port = 4000;

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "mydatabase",
});

app.get("/api/data", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "API работает!", timestamp: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ error: "DB Error", details: err.message });
  }
});

app.listen(port, () => {
  console.log(`Backend работает на порту ${port}`);
});
