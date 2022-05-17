require("dotenv").config();
const express = require("express");
const app = express();
const cookie = require("cookie-parser");
const { pool } = require("./pool_connection");
const Pool = require("pg").Pool;
const auth = require("./auth");

const { BASE_URL } = require("./src/utilities/routes");

const Users = require("./src/models/users");
const Approval = require("./src/models/approvals");
const Organisations = require("./src/models/organisations");
const Products = require("./src/models/products");
const UserOrgs = require("./src/models/user_orgs");
const ProductModeDetails = require("./src/models/product_mode_details");
const ChatRoom = require("./src/models/chat_room");
const Messages = require("./src/models/messages");
// const ChatServer = require("./src/config/chat");


const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cookie());

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
// Users.schemaFuncs();
// Approval.schemaFuncs();
// Organisations.schemaFuncs();
// Products.schemaFuncs();
// UserOrgs.schemaFuncs();
// ProductModeDetails.schemaFuncs();
// ChatRoom.schemaFuncs();
// Messages.schemaFuncs();

app.use("/", auth);
app.use('/',require('./src/controllers/chatApi'));

console.log("App is now ready on localhost:3000");
app.listen(3000);
