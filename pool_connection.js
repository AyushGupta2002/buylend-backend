const Pool = require("pg").Pool;

// Declare a new client instance from Pool()
const pool = new Pool({
  user: "upztwcpdebg04zrve9fz",
  host: "bwnfgxqsex6pxqrhanfs-postgresql.services.clever-cloud.com",
  database: "bwnfgxqsex6pxqrhanfs",
  password: "mjZckgCxk8QuAW8O0ZNM",
  port: "5432",
});

module.exports = {
  pool,
};
