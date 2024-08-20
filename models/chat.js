const mongoose = require("mongoose");
//we dont need to apply the same code of mongoose here bcz we are going to require this entire code in index.js

const chatSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    maxLength: 50,
  },
  created_at:{
    type:Date,
  }
});

const Chat = mongoose.model("Chat", chatSchema); //  it will be Chats in DB

module.exports=Chat;