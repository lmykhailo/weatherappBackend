const pool = require("../db");
class PostsController {
  async createPost(req, res) {
    const { header, text, imageurl } = req.body;

    try {
      const post = await pool.query(
        "INSERT INTO posts_base (header, text, imageurl) VALUES ($1, $2, $3) RETURNING *",
        [header, text, imageurl]
      );
      res.json(post.rows[0]);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getPosts(req, res) {
    try {
      const posts = await pool.query(
        "SELECT * FROM posts_base ORDER BY id DESC"
      );
      res.json(posts.rows);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getPostsForSideBar(req, res) {
    try {
      const posts = await pool.query(
        "SELECT * FROM posts_base ORDER BY id DESC LIMIT 3"
      );
      res.json(posts.rows);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getOnePost(req, res) {
    const { id } = req.params;
    try {
      const users = await pool.query("SELECT * FROM posts_base WHERE id = $1", [
        id,
      ]);
      res.json(users.rows[0]);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async updatePost(req, res) {
    const { id } = req.params;
    const { header, text, imageurl } = req.body;
    try {
      const updatedUser = await pool.query(
        "UPDATE posts_base SET header = $1, text = $2, imageurl = $3 WHERE id = $4 RETURNING *",
        [header, text, imageurl, id]
      );
      res.json(updatedUser.rows[0]);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async deletePost(req, res) {
    const { id } = req.params;
    try {
      await pool.query("DELETE FROM posts_base WHERE id = $1", [id]);
      res.json({ message: "Post deleted" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = new PostsController();
