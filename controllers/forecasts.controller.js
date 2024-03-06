const pool = require("../db");
class ForecastController {
  async createForecast(req, res) {
    const { name, country, lat, lon, uid } = req.body;

    try {
      const existingEntry = await pool.query(
        "SELECT * FROM search_results WHERE uid = $1 AND name = $2 AND country = $3 AND lat = $4 AND lon = $5",
        [uid, name, country, lat, lon]
      );

      if (existingEntry.rows.length > 0) {
        return res.status(400).json({ message: "Forecast already exists." });
      }
      const newForecast = await pool.query(
        "INSERT INTO search_results (name, country, lat, lon, uid) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, country, lat, lon, uid]
      );
      res.json(newForecast.rows[0]);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getForecasts(req, res) {
    try {
      const forecasts = await pool.query("SELECT * FROM search_results");
      res.json(forecasts.rows);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getUserForecasts(req, res) {
    const uid = req.headers["x-user-uid"];
    try {
      const forecasts = await pool.query(
        "SELECT * FROM search_results WHERE uid = $1",
        [uid]
      );
      res.json(forecasts.rows);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getOneForecast(req, res) {
    const { id } = req.params;
    try {
      const forecast = await pool.query(
        "SELECT * FROM search_results WHERE id = $1",
        [id]
      );
      res.json(forecast.rows[0]);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async updateForecast(req, res) {
    const { id } = req.params;
    const { name, country, lat, lon, uid } = req.body;
    try {
      const updatedForecast = await pool.query(
        "UPDATE search_results SET name = $1, country = $2, lat = $3, lon = $4 , uid = $5 WHERE id = $6 RETURNING *",
        [name, country, lat, lon, uid, id]
      );
      res.json(updatedForecast.rows[0]);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async deleteForecast(req, res) {
    const { id } = req.params;
    try {
      await pool.query("DELETE FROM search_results WHERE id = $1", [id]);
      res.json({ message: "Forecast deleted" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = new ForecastController();
