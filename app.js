require("dotenv").config();
const express = require("express");
const app = express();
const { pool } = require("./pool_connection");
const Pool = require("pg").Pool;
const { BASE_URL } = require("./src/utilities/routes");

const Users = require("./src/models/users");
const Approval = require("./src/models/approvals");
const Products = require("./src/models/products");
const UserOrgs = require("./src/models/user_orgs");
const Organisations = require("./src/models/organisations");
const ProductModeDetails = require("./src/models/product_mode_details");



const bodyParser = require("body-parser");
app.use(bodyParser.json());

 // common handling of requests
app.use(BASE_URL, (req, res, next) => {
  console.info(req.method, req.url);
  next();
});
const cors = require('cors');
const corsOptions = {
  origin(origin, callback) {
    callback(null, true);
  },
  credentials: true,
  exposedHeaders: 'Content-disposition, x-suggested-filename',
};
app.use(cors(corsOptions));

// creating models if not created
Users.schemaFuncs();
Approval.schemaFuncs();
Products.schemaFuncs();
UserOrgs.schemaFuncs();
Organisations.schemaFuncs();
ProductModeDetails.schemaFuncs();



// app.get("/api/org", (req, res) => {
//   const Query = `SELECT * from buylend_schema`;
//   pool.query(
//     Query,
//     (error, orgs) => {
//       res.json({ response: orgs.rows });
//     }
//   );
// });




app.use((req, res) => {
  res.status(404);
  res.send({
    error: { message: "Sorry, this is an invalid URL" },
  });
});
//
console.log("App is now ready on localhost:3000");
app.listen(3000);
