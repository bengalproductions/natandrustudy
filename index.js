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

function search(nameKey, myArray){
  for (var i=0; i < myArray.length; i++) {
      if (myArray[i].topic === nameKey) {
          return myArray[i];
      }
  }
}

app.get("/history", async (req, res) => {
  const {value: doc} = await db.fetch({
    "subject": "history"
}).next();
var topics = []
doc.forEach((element)=>{
if(search(element.topic, topics)){
  let obj = topics.find(x => x.topic === element.topic);
  let index = topics.indexOf(obj);
  topics[index].notes.push(element)
}else{
  topics.push({topic:element.topic, notes: [element]})
}
})
topics.forEach((element2)=>{
  element2.notes.sort((a, b) => (a.numberintopic > b.numberintopic) ? 1 : -1)
})
    res.render(__dirname + "/views/history.ejs", {topics: topics})
});

app.get("/business", (req, res) => {
  res.sendFile(__dirname + "/views/business.html");
});

app.get("/geography", (req, res) => {
  res.sendFile(__dirname + "/views/geography.html");
});

app.get("/religion", (req, res) => {
  res.sendFile(__dirname + "/views/religion.html");
});

app.get("/admin/makenotes", (req,res)=>{
  res.sendFile(__dirname + "/views/makenotespage.html");
})

app.get("/notes/:slug", async (req,res)=>{
  const {value: doc} = await db.fetch({
    "slug": req.params.slug
}).next();
  if(doc.length > 0) {
    res.render(__dirname+"/views/notes.ejs", {notes: doc[0], url:'https://natandrustudy.com'+ req.originalUrl}) //replace with your domain
  }else{
    res.status(404).sendFile(__dirname + "/views/404.html");
  }
})

app.post("/admin/makenotes", async (req,res)=>{
  const options = {
    method: 'POST',
    url: 'https://api.short.io/links',
    headers: {
      Authorization: process.env.SHORT_API_KEY,
    },
    json: {
      originalURL: 'https://natandrustudy.com/notes/'+req.body.slug, //replace with your domain
      domain: 'natand.ru' //replace with your domain
    },
    responseType: 'json'
  };
  got(options).then(async (response) => {
    const notes = await db.put({
      title: req.body.title,
      slug: req.body.slug,
      description: req.body.description,
      cdnurl: req.body.cdnurl,
      cdnthumb: req.body.cdnthumb,
      subject: req.body.subject,
      shorturl: response.body.secureShortURL,
      topic: "none",
      numberintopic: 0
  })
  res.json(notes)
  });
})

app.get("*", (req,res)=>{
  res.status(404).sendFile(__dirname+"/views/404.html")
})

const listener = app.listen(800, () => { //replace 800 with your port
  console.log("Your app is listening on port " + listener.address().port);
});
