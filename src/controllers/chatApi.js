const express = require('express');
const app=express();
const { pool } = require("../../pool_connection");
const Pool = require("pg").Pool;
const Users = require("../models/users");
const chatServer = require("../config/chat");
const crypto = require("crypto");
// const Approval = require("../models/approvals");
const UserOrgs = require("../models/user_orgs");
app.use(express.json());

// name of chat table to be corrected

//Inserting a new chat
app.post('/newchat',async(req,res)=>{
  const {
    bid,
    sid,
    msg
  }=req.body;

  // const checkRoom = await pool.query(`select * from buylend_schema.chat_room where buyer_id = '${bid}' and seller_id = '${sid}'`);
  // res.send("Inserted!");

  // const id = crypto.randomBytes(16).toString("hex"); // bid+sid

  console.log(req.body);
  try{
    const insertNewChat=await pool.query(`INSERT INTO buylend_schema.messages(id, bid, sid, msg) VALUES
    ($1,$2,$3,$4) returning*`,[id,bid,sid,msg]);
    res.send("Inserted!");
  }
  catch(error)
  {
    res.send(error.message);
  }
});


//Getting older chats
app.get('/chat/:roomId',async(req,res)=>{
  try{
    const getOlderChatsById= await pool.query(`SELECT * from buylend_schema.messages where chat_id = '${req.params.roomId}'`); 
    console.log("Hi!");
    let messages = [];
    getOlderChatsById.rows.forEach(el => {
      messages.push({
        sender : el.sender_id,
        message : el.message
      });
    });
    res.json({response: messages});
  }
  catch(error){
    res.send(error.message);
  }
});


//Insert new chat into existing chat   .....work on it
app.post('/chat/:id',async(req,res)=>{
  const { senderId } = req.params;
  const {msg} = req.body;
  const chatID = '1';
  console.log(req.body);

  const userId = crypto.randomBytes(16).toString("hex");


  try{
    const InsertChat=await pool.query(`INSERT INTO buylend_schema.messages (id,chat_id,sender_id,message) VALUES ('${userId}','${chatID}','${req.params.id}','${req.body.msg}')`);
    res.send(InsertChat);
  }
  catch(error)
  {
    res.send(error.message);
  }

})

//Delete chats
app.delete('/chat/:chatid',async(req,res)=>{
  const {chatId}=req.params;
  // const {sid} = req.params;
  try{
    const deleteChat=await pool.query(`DELETE FROM buylend_schema.messages WHERE chat_id =$1`,[chatId]);
    res.send("Chats deleted successfully!!");
  }
  catch(error){
    res.send(error.message);
  }
})


module.exports=app;