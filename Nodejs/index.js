import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// mongoose database;
mongoose.connect("mongodb://localhost:27017",{
    dbName:"backend",
}).then(()=>console.log("DB connected Successfully")).catch((err)=>console.log("error:",err));

// mongoose schema 
const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
});

const Message = mongoose.model("user",messageSchema);

const app= express();
// middlewares start 

// to serve the static file properly use express static 
// it will throw error  becuase it can be handle using middleware like use 
// express.static(path.join(path.resolve(),"public"));
// instead use use mide ware 
app.use(express.static(path.join(path.resolve(),"public")))
// in order to get the value of the forms input use middleware 
app.use(express.urlencoded());
app.use(cookieParser());


// middlewares ends 
// seting up view engine in order to render the ejs
app.set("view engine","ejs");

// const userData=[];
// console.log(path.join(path.resolve(),"public"));

app.get("/",(req,res)=>{
   res.render("login.ejs",{name:"avinash singh "});
// res.sendFile(index)
}); 

app.get("/success",(req,res)=>{
   res.render("success",{name:"avinash singh "});
// res.sendFile(index)
});

app.post("/contact",async(req,res)=>{
    // userData.push({username:req.body.name, email:req.body.email});
    const messageData ={"name":req.body.name, "email":req.body.email};
    // res.json(userData);
    // res.sendFile(index)
    await Message.create(messageData).then(()=>console.log("added Success")).catch((err)=>console("Error in add"));
    console.log(messageData);


});

app.post("/",(req,res)=>{
    // res.send("Form Submitted Succesfull");
    console.log(req.body);
    userData.push({username:req.body.name, email:req.body.email});
    // console.log(userData);
    // res.redirect();
    // res.render("success");
    res.redirect("/success");
});

app.get("/users",(req,res)=>{
   res.json({
    userData,
   })
});

app.post("/login",(req,res)=>{
   res.cookie("token","iamin",{
    httpOnly:true,
    expires:new Date(Date.now()+60*1000)

   });
   res.redirect("/login")
});

app.get("/login",(req,res)=>{
//    const token =req.cookies.token
   const {token} =req.cookies
   console.log(token)
   
});


// app.get("/add",async(req,res)=>{
//    await Message.create({name:"avinash",email:"avinash@gmail.com"}).then(()=>console.log("added Success")).catch((err)=>console("Error in add"));
// });

app.listen(5000,()=>{
    console.log("Server is working");
}) 