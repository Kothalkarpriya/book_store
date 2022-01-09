const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
require("./db/conn");
const Register = require("./models/register");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public/css");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");


app.use(express.static(static_path));
app.set("view Engine", "hbs");

app.set("views" ,templates_path);
hbs.registerPartials(partials_path);

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/", (req, res) => {
    res.render("register.hbs");
});

app.get("/login.hbs",(req,res)=>{
     res.render("login.hbs");
});
// app.get("/index",(req,res)=>{
//     res.render("index.html");
// });

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
            res.status(201).render("register.hbs");
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