const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "apnacollage",
        content: "i love coding"
    },
    {
        id: uuidv4(),
        username: "tumharacollage",
        content: "i love machine"
    },
    {
        id: uuidv4(),
        username: "meracollage",
        content: "i love civil"
    },
];

// index Route
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

// create Route
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

// new post
app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let newid = uuidv4();
    posts.push({ id: newid, username, content });
    console.log(req.body);
    res.redirect("/posts");
});

// update
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newcontent;
    console.log(post);
    res.redirect("/posts");
});

// EDIT DATA
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
});

app.listen(port, () => {
    console.log(`server is working ${port}`);
});
