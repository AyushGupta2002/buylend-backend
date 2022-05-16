const express = require('express');
const app=express();
const { pool } = require("../../pool_connection");
const Pool = require("pg").Pool;
const Users = require("../models/users");
const Approval = require("../models/approvals");
const UserOrgs = require("../models/user_orgs");
const Organisations = require("../models/organisations");
app.use(express.json());

// Anyone can see organisations rest others have to be admin inorder to do some other works

//Inserting a new organisation
app.post('/organisations/neworganisation',async(req,res)=>{
  const {
    id,
    org_name,
    org_domain,
    org_location
  } = req.body;

  console.log(req.body);

  try{
      // only if user is admin otherwise return error
      if(id != 1){
          res.send("Only admins are allowed to create organisation");
      }
        const insertNewOrganisation = await pool.query(`INSERT INTO buylend_schema.organisations(id, org_name, org_domain,org_location) VALUES
        ($1,$2,$3,$4)`,[id, org_name, org_domain, org_location]);
        res.send("Inserted a new organisation!");
  }
  catch(error)
  {
    res.send(error.message);
  }
});


//Getting all Organisations
app.get('/organisations',async(req,res)=>{

  try{
    const getOrganisations = await pool.query(`SELECT * from buylend_schema.organisations`);
    res.json(getOrganisations.rows);
  }
  catch(error){
    res.send(error.message);
  }
});

//Update existing organisation
app.put('/organisations/updateorganisation/:id',async(req,res)=>{
  const { id } = req.params;

  const {
    org_name,
    org_domain,
    org_location
  }=req.body;
  
  console.log(req.body);

  try{
    if(id != 1){
        res.send("Only admins are allowed to update organisation");
    }
    const updateExistingOrganisation = await pool.query(`UPDATE buylend_schema.organisations SET org_name=$1,org_domain=$2,org_location=$3 WHERE id=1`,[org_name, org_domain, org_location, id]);
    res.send("Organisation Updated Successfully!");
  }
  catch(error)
  {
    res.send(error.message);
  }
})

//Deletion of organisation
app.delete('/organisations/deleteorganisation/:id',async(req,res)=>{
  const {id} = req.params;
  try{
    if(id != 1){
        res.send("Only admins are allowed to delete organisation");
    }
    const deleteOrganisation = await pool.query(`DELETE FROM buylend_schema.organisations WHERE id=$1`,[id]);
    res.send("Organisation deleted Successfully!");
  }
  catch(error){
    res.send(error.message);
  }
})


module.exports=app;