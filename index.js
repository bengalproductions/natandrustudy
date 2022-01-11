require('dotenv').config()
const express = require("express");
const app = express();

const { Deta } = require("deta");
const deta = Deta(process.env.DETA_PROJECT_KEY);
const db = deta.Base("notes");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs')

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/history", (req, res) => {
  res.sendFile(__dirname + "/views/history.html");
});

app.get("/science", (req, res) => {
  res.sendFile(__dirname + "/views/science.html");
});

app.get("/geography", (req, res) => {
  res.sendFile(__dirname + "/views/geography.html");
});

app.get("/religion", (req, res) => {
  res.sendFile(__dirname + "/views/religion.html");
});

app.get("*", (req,res)=>{
  res.sendFile(__dirname+"/views/404.html")
})

const listener = app.listen(800, () => { //replace 800 with your port
  console.log("Your app is listening on port " + listener.address().port);
});
