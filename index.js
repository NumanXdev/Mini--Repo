const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

// let chat1 = new Chat({
//   from: "Neha",
//   to: "preya",
//   message: "Send me you physics notes",
//   created_at: new Date(),
// });

// chat1.save()
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// })
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

main()
  .then((res) => {
    console.log("Connnection Succesful");
  })
  .catch((err) => {
    console.log("Error ");
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatapp");
}

app.get("/", (req, res) => {
  res.send("Root dir is working");
});
//Index Route
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  // res.send(chats);
  res.render("index.ejs", { chats });
  // res.send("Chat shwed");
});

app.get("/chats/new", (req, res) => {
  res.render("form.ejs");
});
//create
app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    message: msg,
    created_at: new Date(),
  });
  newChat.save();
  res.redirect("/chats");
  // console.log(req.body);

  res.send("Workking");
});

//Edit route
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let userdata = await Chat.findById(id);
  console.log(userdata);
  // console.log(id);
  res.render("edit.ejs", { userdata });
  // res.send("Working")
});

//Put request
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  //  let newMsg=req.body;
  let { edit: newMsg } = req.body; /// msg in key value pair
  console.log(newMsg);
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { message: newMsg },
    { runValidators: true, new: true }
  );
  console.log(updatedChat);
  res.redirect("/chats");
});

//Delete route
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  // console.log(id);
  let deleteChat = await Chat.findByIdAndDelete(
    id,
    { new: true },
    { runValidators: true }
  );
  // console.log(deleteChat);
  res.redirect("/chats")
});

app.listen(8080, () => {
  console.log("app is listening");
});
