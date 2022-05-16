const express = require('express');
const app=express();
const { pool } = require("../../pool_connection");
const Pool = require("pg").Pool;
const Users = require("../models/users");
const chatServer = require("../config/chat");
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

  const checkRoom = await pool.query(`select * from buylend_schema.chat_room where buyer_id = '${bid}' and seller_id = '${sid}'`);
  // res.send("Inserted!");

  const id = crypto.randomBytes(16).toString("hex"); // bid+sid

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
  const {chatId} = req.params;
  console.log(chatId);
  try{
    const getOlderChatsById=await pool.query(`SELECT * from buylend_schema.chats where chat_id=$1`,[chatId]); // correct it
    res.json(getOlderChatsById.rows);
  }
  catch(error){
    res.send(error.message);
  }
});


//Insert new chat into existing chat   .....work on it
app.put('/chat/updatechat/:id',async(req,res)=>{
  const { id } = req.params;
  const {msg} = req.body;

  console.log(req.body);

  try{
    const updateExistingChat=await pool.query(`UPDATE buylend_schema.messages SET msg=$1 WHERE id=$2`,[msg,id]);
    res.send(updateExistingChat.rows);
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