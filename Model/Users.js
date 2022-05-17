// const { require } = require("yargs")

const { pool } = require("../pool_connection");
const bcrypt = require("bcrypt");
const { encodeToken } = require("../src/config/njwt");
const addUser = async (name, email, password, phone_number, address) => {
  // finding whether email is already registered
   console.log(1)
  const existingUser =0 
  await pool.query(
    `SELECT * FROM buylend_schema.users where email = ?`,
    [email],(err,result)=>{

      if(err)   throw(err)
      if(result.length!=0)  existingUser=1;   
    }
  );
  console.log(name)
  if (existingUser) return { error: "User already exists" };

  password = await bcrypt.hash(password, 8);
    const id=100;
  const createUser = await pool.query(
    `INSERT INTO buylend_schema.users ('id','name','email','password','phone_number','address') values (?,?,?,?,?,?)`,
    [id, name, email, password, phone_number, address]
  );
  //console.log("hello");
     return { name, email, password, phone_number, address };
};

const verifyUser = async (email, password) => {
  const existingUser = pool.query(
    "select password from users where email === email"
  );
  if (!existingUser) return { error: `${email} is not registered!` };
  const validPassword = await bcrypt.compare(password, user.password);
  if (validPassword) {
  }
};

 module.exports = { addUser, verifyUser };
