const express = require("express"); //requiring express
const app = express(); //initializing express with app
const port = 8080; //defining the port number
const path = require("path"); //define path to require the path
const { v4: uuidv4 } = require("uuid");
//uuidv4(); //calling this function generates id ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true })); //parsing data to understand express (post)
app.use(methodOverride("_method")); //using method override in app (to use patch put delete in html)

app.set("view engine", "ejs"); //setting viewengine to EJS (as there are many enginee)
app.set("views", path.join(__dirname, "views")); //initializing view folder, accessing outside parent dir

app.use(express.static(path.join(__dirname, "public"))); //same for public folder

let posts = [
  {
    id: uuidv4(),
    username: "puneeth",
    content: "There's nothing lost or wasted in life",
  },
  {
    id: uuidv4(),
    username: "harry",
    content: "keep it simple!",
  },
  {
    id: uuidv4(),
    username: "shardha",
    content: "welcome to apna college",
  },
];

app.get("/", (req, res) => {
  res.send("please check the url and go to /posts");
});

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts }); // passed posts in obj form from index.js to index.ejs
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs"); // nothing to pass
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params; //passed in parameters
  let newcontent = req.body.content; //the whole content is stored in body.content
  let post = posts.find((p) => id === p.id);
  post.content = newcontent;
  console.log(post);
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edits.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});

app.get("*", (req, res) => {
  let code = "<h1>PAGE NOT FOUND</h1>";
  res.send(code);
});

app.listen(port, () => {
  //listening to port number with respect to the server
  console.log(`listening to port number ${port}`);
});
