const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
require("./db/conn");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public/css");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");


app.use(express.static(static_path));
app.set("view Engine", "hbs");

app.set("views" ,templates_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("register.hbs");
});

app.get("./login.hbs",(req,res)=>{
    res.render("login.hbs");
});
// app.get("/index",(req,res)=>{
//     res.render("index.html");
// });

app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
});