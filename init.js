const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatapp");
}
main()
  .then((res) => {
    console.log("Connnection Succesful");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

let allChats = [
  {
    from: "neha",
    to: "preeti",
    message: "Send me notes for the exam",
    created_at: new Date(),
  },
  {
    from: "rohit",
    to: "mohit",
    message: "Teach me JS callbacks",
    created_at: new Date(),
  },
  {
    from: "sumit",
    to: "amit",
    message: "all the best",
    created_at: new Date(),
  },
  {
    from: "tony",
    to: "peter",
    message: "all the best",
    created_at: new Date(),
  },
];

Chat.insertMany(allChats);
