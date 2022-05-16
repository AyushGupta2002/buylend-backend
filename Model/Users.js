// const { require } = require("yargs")

const { pool } = require("../pool_connection");
const bcrypt = require("bcrypt");
// const { encodeToken } = require("../src/config/njwt");
// const createUser = await pool.query(
//   `INSERT INTO buylend_schema.users values(1, raam,email@email.com,password,phone_number,address)`,
//   res.json("Added!");
const Query1 = `INSERT INTO buylend_schema.users values('145', 'kartik', 'hwhwe@gmail.com', 'pass', '827382', 'hsjajdsa kj09')`;
pool.query(Query1, (error, results) => {
  if (error) console.log(error);
});

// const addUser = async (name, email, password, phone_number, address) => {
//   // finding whether email is already registered
//   const existingUser = await pool.query(
//     `SELECT id FROM buylend_schema.users where phone_number = '${phone_number}'`
//   );
//   if (existingUser) return { error: "Phone Number is already taken" };

//   password = await bcrypt.hash(password, 8);

//   const createUser = await pool.query(
//     "INSERT INTO buylend_schema.users values(1, raam,email@email.com,password,phone_number,address)",
//     [id, name, email, password, phone_number, address]
//   );

//   console.log("hello");
//   //   return { user };
// };

// const verifyUser = async (email, password) => {
//   const existingUser = pool.query(
//     "select password from users where email === email"
//   );
//   if (!existingUser) return { error: `${email} is not registered!` };
//   const validPassword = await bcrypt.compare(password, user.password);
//   if (validPassword) {
//   }
// };

// addUser(
//   "1",
//   "hello",
//   "hello@hello",
//   "123456789",
//   "1234567890",
//   "hello8 989898"
// );
// console.log("added");
// module.exports = { addUser, verifyUser };
