const Pool = require("pg").Pool;

// Declare a new client instance from Pool()
const pool = new Pool({
  user: "u3dgdxwjy9znwplswddi",
  host: "bubhj8knto3tlez9ymru-postgresql.services.clever-cloud.com",
  database: "bubhj8knto3tlez9ymru",
  password: "o6gQMTaJn7bI9d9VdlED",
  port: "5432",
});

module.exports = {
  pool,
};
