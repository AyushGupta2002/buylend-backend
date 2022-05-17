// const { require } = require("yargs")

const { pool } = require("../../pool_connection");
const bcrypt = require("bcrypt");
const { encodeToken } = require("../config/njwt");
const crypto = require("crypto");
const { exist } = require("joi");
const addUser = async (name, email, password, phone_number, address) => {
  // finding whether email is already registered
  console.log("Connected!");
  const client = await pool.connect();

  try {
    const result = await client.query(
      `SELECT * FROM buylend_schema.users where email = '${email}'`
    );
    if (result && result.rows.length !== 0) throw new Error("User exists");
    // console.log(result);
    password = await bcrypt.hash(password, 8);
    const userId = crypto.randomBytes(16).toString("hex");
    const createUser = await client.query(
      `INSERT INTO buylend_schema.users ( id , name , email , password , phone_number , address) values ($1,$2,$3,$4,$5,$6)`,
      [userId, name, email, password, phone_number, address]
    );
    // console.log(createUser, 'here');
  } catch (err) {
    console.log(err);
    throw new Error("Could not signup");
  }
  //  return { nam};
};
const verifyUser = async (email, password) => {
  console.log(email, password);
  let existingUser;
  const client = await pool.connect();
  try {
    existingUser = await client.query(
      `SELECT * FROM buylend_schema.users WHERE email = '${email}'; `
    );
    if (existingUser.rows.length === 0) throw new Error("Not found!!");
    existingUser = existingUser.rows[0];
    console.log(existingUser);
    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) throw new Error("wrong password");
    return existingUser;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
    client.release();
  }
};

// addUser("hello", "hello@hello.com", "123456789", "0123456789", "hello");

module.exports = { addUser, verifyUser };
