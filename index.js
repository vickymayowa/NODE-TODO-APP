const express = require("express")
const bodyParser = require('body-parser');
const mongoose = require("mongoose")
const ejs = require('ejs')
const app = express();
const URI = "mongodb+srv://favouradebanjo603:oluyomiadebanjo@cluster0.ae47tji.mongodb.net/TodoProject_db?retryWrites=true&w=majority"
mongoose.connect(URI)

.then(()=>{
  console.log("Mongoose HandShake Approved");
  console.log("Mongoose Activated Connected");
})
.catch((err)=>{
  console.log("Mongoose Handshake Disconnected");
 //console.log(err);
})

app.get("/todo",(req,res)=>{
    console.log("User Visted The Page")
    res.render("todo")
})

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine','ejs')


let userSchema = {
    todoName:{type:String, required:true},
    todoDescription:{type:String, required:true,unique:true},
    myDate:{type:Date,required:true},
    myDate: new Date()
}

let userModel = mongoose.model("TodoApp", userSchema)

app.post("/user",(req,res)=>{
    console.log(req.body);
    let form = new userModel(req.body)
    console.log(form)
    form.save()
    .then((response)=>{
    //   res.redirect("/signin")
      res.render("user",{message:"Registration Completed"})
      console.log("SuccessFully Saved into the Database");
      console.log(response)
      res.render("todo",{message:"Registration Completed"})
    })
    .catch((error)=>{
        console.log(error)
    })
  })



app.listen("3000",()=>{
    console.log("Server Started...............")
    console.log("Server Started on port 3000")
})


