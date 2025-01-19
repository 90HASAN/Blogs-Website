import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT_SERVER;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: process.env.BLOGS,
  password: process.env.PASSWORD,
  port: process.env.PORT_DB,
});


db.connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Database connection error:", err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// Fetch all blogs
app.get("/api/blogs", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM blogs ORDER BY id DESC");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// Add a new blog
app.post("/api/blogs", async (req, res) => {
  const { title, content } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO blogs (title, content, created_at) VALUES ($1, $2, NOW()) RETURNING *",
      [title, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create blog post" });
  }
});


// Fetch recent posts (max 5)
app.get("/api/blogs/recent", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM blogs ORDER BY id DESC LIMIT 5"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch recent posts" });
  }
});

// Fetch a single blog by ID
app.get("/api/blogs/:id", async (req, res) => {

  const { id } = req.params;
 
  try {
    const result = await db.query("SELECT * FROM blogs WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch blog" });
  }
});

app.delete("/api/blogs/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query("DELETE FROM blogs WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

// Update a blog post
app.put("/api/blogs/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const result = await db.query(
      "UPDATE blogs SET title = $1, content = $2 WHERE id = $3 RETURNING *",
      [title, content, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update blog" });
  }
});


app.put("/api/blogs/:id/like", async (req, res) => {
  const { id } = req.params;
  const { liked } = req.body;

  try {
    const result = await db.query(
      "UPDATE blogs SET liked = $1 WHERE id = $2 RETURNING *",
      [liked, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json({ message: "Blog like state updated successfully", blog: result.rows[0] });
  } catch (err) {
    console.error("Failed to update like state:", err);
    res.status(500).json({ error: "Failed to update like state" });
  }
});

app.get('/api/favourite-blogs', async (req, res) => {
  try {
    const result = await db.query('SELECT title, content FROM blogs WHERE liked = true');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching favourite blogs:', error);
    res.status(500).send('Server error');
  }
});
 
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

