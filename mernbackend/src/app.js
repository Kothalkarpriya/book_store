const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
require("./db/conn");
const Register = require("./models/register");
const { text } = require("express");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public/css");
const javascript_path = path.join(__dirname,"../public/javascript");
const image_path = path.join(__dirname, "../public/lib");
const bookimage_path = path.join(__dirname, "../public/lib/booksimage");
const computerbookimage_path = path.join(__dirname, "../public/lib/computer-science");
const icons_path = path.join(__dirname, "../public/lib/icons");

const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
const book_path = path.join(__dirname,"../templates/books");
const text_books_path = path.join(__dirname,"../templates/text-books");


app.use(express.static(static_path));
app.use(express.static(javascript_path));
app.use(express.static(image_path));
app.use(express.static(bookimage_path));
app.use(express.static(computerbookimage_path));
app.use(express.static(icons_path));


app.set("view Engine", "hbs");

app.set("views" ,templates_path);
app.set("books",book_path);
app.set("text-books",text_books_path);

hbs.registerPartials(partials_path);

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/", (req, res) => {
    res.render("index.hbs");
});

app.get("/register.hbs", (req, res) => {
    res.render("register.hbs");
});

app.get("/login.hbs",(req,res)=>{
     res.render("login.hbs");
});
app.get("/about-us.hbs",(req,res)=>{
    res.render("about-us.hbs");
});

// books 
app.get("../arts_of_luca.hbs", (req, res) => {
    res.render("arts_of_luca.hbs");
});

app.get("../arts-and-photo.hbs", (req, res) => {
    res.render("arts-and-photo.hbs");
});
app.get("/avtar.hbs", (req, res) => {
    res.render("avtar.hbs");
});
app.get("/biography.hbs", (req, res) => {
    res.render("biography.hbs");
});
app.get("/body-mind.hbs", (req, res) => {
    res.render("body-mind.hbs");
});
app.get("/building_a_life.hbs", (req, res) => {
    res.render("building_a_life.hbs");
});
app.get("/environment.hbs", (req, res) => {
    res.render("environment.hbs");
});
app.get("/fiction.hbs", (req, res) => {
    res.render("fiction.hbs");
});
app.get("/from_a_mountain.hbs", (req, res) => {
    res.render("from_a_mountain.hbs");
});

app.get("/hungry_hearts.hbs", (req, res) => {
    res.render("hungry_hearts.hbs");
});
app.get("/lifestyle.hbs", (req, res) => {
    res.render("lifestyle.hbs");
});
app.get("/travel-and-holiday.hbs", (req, res) => {
    res.render("travel-and-holiday.hbs");
});
app.get("/voice_of_human.hbs", (req, res) => {
    res.render("voice_of_human.hbs");
});



// text-books path to get

app.get("/compiler-design.hbs", (req, res) => {
    res.render("compiler-design.hbs");
});
app.get("/computer-science.hbs", (req, res) => {
    res.render("computer-science.hbs");
});
app.get("/data-structures.hbs", (req, res) => {
    res.render("data-structures.hbs");
});
app.get("/operating.system.hbs", (req, res) => {
    res.render("operating.system.hbs");
});
app.get("/stream-computer-science.hbs", (req, res) => {
    res.render("stream-computer-science.hbs");
});
app.get("/system-programming.hbs", (req, res) => {
    res.render("system-programming.hbs");
});




// register post method
app.post("/register", async(req,res) => {
    // res.render("register.hbs");
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){

            const registerEmployee = new Register({

                firstname : req.body.firstname,
                lastname : req.body.lastname,
                city : req.body.city,
                state : req.body.state,
                zip : req.body.zip,
                email : req.body.email,
                address : req.body.address,
                password : password,
                confirmpassword : cpassword
            }); 

            const registered = await registerEmployee.save();
            res.status(201).render("register.hbs");

        }else{
            res.send("Passwords are not matching");
        }

    }catch(error){
        res.status(400).send(error);
    }
})

// login check
app.post("/login", async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const userEmail = await Register.findOne({email:email});
    
        if(userEmail.password === password){
            res.status(201).render("index.hbs");
        }else{
            res.send("Please insert correct details");
        }
    }catch(error){
        res.status(400).send("Invalid Details");
    }
});

app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
});