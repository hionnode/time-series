const { Pool } = require("pg");
require("dotenv").config();

const connectionString = process.env.POSTGRES_STRING;

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
