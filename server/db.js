const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "sidoux",
  password: "oui",
  port: 5432,
  database: "jwttutorial",
});

module.exports = pool;
