const Pool = require("pg").Pool;

// Declare a new client instance from Pool()
const pool = new Pool({
  user: "u8gxwvjqkop4ltggwwx6",
  host: "brpbutqbe5bhuxpautl0-postgresql.services.clever-cloud.com",
  database: "brpbutqbe5bhuxpautl0",
  password: "F5suO3PMLGvcRJ5RwOEv",
  port: "5432",
});

module.exports = {
  pool,
};
