const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "mle",
  host: "localhost",
  port: 5000,
  database: "WeatherAppDB",
});

module.exports = pool;
