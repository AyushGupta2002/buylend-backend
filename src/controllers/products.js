const express = require('express');
const app=express();
const { pool } = require("../../pool_connection");
const Pool = require("pg").Pool;
const Users = require("../models/users");
const Approval = require("../models/approvals");
const Products = require("../models/products");
const UserOrgs = require("../models/user_orgs");
const Organisations = require("../models/organisations");
const ProductModeDetails = require("../models/product_mode_details");

app.use(express.json());// we access any data sent by the client side via req.body;

//Inserting a new product
app.post('/org/newproduct',async(req,res)=>{
  const {
    id,
    product_name,
    category,
    description,
    user_id,
    org_id,
    available
  }=req.body;

  console.log(req.body);
  try{
    const insertNewProduct=await pool.query(`INSERT INTO buylend_schema.products(id,product_name,category,description,user_id,org_id,available) VALUES
    ($1,$2,$3,$4,$5,$6,$7) returning*`,[id,product_name,category,description,user_id,org_id,available]);
    res.send("Inserted!");
  }
  catch(error)
  {
    res.send(error.message);
  }
});



//Getting Organisation Specific Products
app.get('/org/:orgId',async(req,res)=>{
  const {orgId}=req.params;
  console.log(orgId);
  try{
    const getProductsByOrgId=await pool.query(`SELECT * from buylend_schema.products where org_id=$1`,[orgId]);
    res.json(getProductsByOrgId.rows);
  }
  catch(error){
    res.send(error.message);
  }
});



//Update existing product
app.put('/org/updateproduct/:id',async(req,res)=>{
  const{
    id
  }=req.params;

  const {
    description,
    available
  }=req.body;
  console.log(req.body);

  try{
    const updateExistingProduct=await pool.query(`UPDATE buylend_schema.products SET description=$1,available=$2 WHERE id=$3`,[description,available,id]);
    res.send("Updated!");
  }
  catch(error)
  {
    res.send(error.message);
  }

})

//Delete a product
app.delete('/org/deleteproduct/:id',async(req,res)=>{
  const {id}=req.params;
  try{
    const deleteProduct=await pool.query(`DELETE FROM buylend_schema.products WHERE id=$1`,[id]);
    res.send("Product successfully deleted!");
  }
  catch(error){
    res.send(error.message);
  }
})


module.exports=app;