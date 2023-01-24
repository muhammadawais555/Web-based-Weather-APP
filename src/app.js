const express = require("express");
const path = require("path");
const hbs = require("hbs")

require("./db/conn")
//require("./db/conn2")
const Signup = require("./models/registers")
const Cont = require("./models/CONTACT")

const app = express();
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname , "../public")
const templates_path = path.join(__dirname , "../templates/views")
const partials_path = path.join(__dirname , "../templates/partials")

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use(express.static(static_path))

app.set("view engine" , "hbs")
app.set("views" , templates_path)
hbs.registerPartials(partials_path)

app.get("/" , (req , res) => 
{
res.render("index");
});

app.get("/about" , (req , res) => 
{
    res.render("about");
})
app.get("/weather" , (req , res) => 
{
    res.render("weather");
})
app.get("/contact" , (req , res) => 
{
    res.render("contact");
})
app.post("/contact" , async(req , res) => 
{
    try {
        {
            const contactinfo = new Cont({
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                country : req.body.country,
                subject : req.body.subject
            })
            const registered = await contactinfo.save();
            res.status(201).render("TYcont" , {
                msg : "Your sujjestion means a lot to us and we we will try to overcome the problem or hurdle you are facing right now we value your feed back thanks!"
            });
        }
    } catch (e) {
        res.status(404).send(e);
    }
})
app.get("/login" , (req , res) => 
{
    res.render("login");
})
app.get("/signup" , (req , res) => 
{
    res.render("signup");
});
app.post("/signup" , async(req , res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword)
        {
            const clientInfo = new Signup({
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                email : req.body.email,
                password : password,
                confirmpassword : cpassword
            })
            const registered = await clientInfo.save();
            res.status(201).render("weather");
        }else{
            res.render("error404" , {
                errormsg : "Passwords did'nt match"
            });
        }
    } catch (e) {
        res.status(404).send(e);
    }
});
app.post("/login" , async(req , res) => 
{
    try {
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await Signup.findOne({email:email})

        if(useremail.password === password)
        {
            res.status(201).render("weather")
        }
        else{
        res.render("incorr" , {
            errormsg : "Incorrect Login Credentials"
        });
    }
    } catch (error) {
        res.status(404).send("Invalid Credentials")
    }
});
app.get("*" , (req , res) => 
{
    res.render("error404" , {
        errormsg:"Oops Page Not Found"
    });
})
app.listen(port , () => 
{
    console.log(`listening to the port number ${port}`)
});

