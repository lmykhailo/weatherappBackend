const pool = require("../db");
class UsersController {
  async createUser(req, res) {
    const { email, displayName, uid } = req.body;

    try {
      const existingEntry = await pool.query(
        "SELECT * FROM user_base WHERE uid = $1",
        [uid]
      );

      if (existingEntry.rows.length === 0) {
        await pool.query(
          "INSERT INTO user_base (email, displayName, uid ) VALUES ($1, $2, $3) RETURNING *",
          [email, displayName, uid]
        );
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getUsers(req, res) {
    try {
      const users = await pool.query("SELECT * FROM user_base");
      res.json(users.rows);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getOneUser(req, res) {
    const { id } = req.params;
    try {
      const users = await pool.query("SELECT * FROM user_base WHERE id = $1", [
        id,
      ]);
      res.json(users.rows[0]);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const { email, displayName, uid } = req.body;
    try {
      const updatedUser = await pool.query(
        "UPDATE user_base SET email = $1, displayName = $2, uid = $3 WHERE id = $4 RETURNING *",
        [email, displayName, uid, id]
      );
      res.json(updatedUser.rows[0]);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
  async getAdminRights(req, res) {
    const uid = req.headers["x-user-uid"];

    try {
      const result = await pool.query(
        "SELECT isadmin FROM user_base WHERE uid = $1",
        [uid]
      );
      if (result.rows.length > 0) {
        res.json({ isadmin: result.rows[0].isadmin });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      await pool.query("DELETE FROM user_base WHERE id = $1", [id]);
      res.json({ message: "User deleted" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = new UsersController();
