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
    console.log("User is adding a todo")
    res.render("todo")
})

app.get("/todolist",(req,res)=>{
  console.log("User Checked the Todo Page")
  res.render("todolist")
  userModel.find()
  .then((response) => {
      console.log(response);
      console.log("User Accessed the DashBoard")
      res.render("dashboard", {response})
  })
  .catch((err) => {
  console.log(err)
})
})

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine','ejs')



let userSchema = {
    todoName:{type:String, required:true},
    todoDescription:{type:String, required:true,unique:true},
    myDate:{type:String,required:true},
}

let userModel = mongoose.model("TodoApp", userSchema)

app.post("/edit",(req,res)=>{
  userModel.findOne({todo:req.body.todoName})
  .then((response)=>{
      console.log(response);
      res.render("editUser", {response:response})
  })
})

    // delete function 

app.post("/delete",(req,res)=>{
  userModel.findOneAndDelete({todo:req.body.todoName})
  .then((response)=>{
    console.log(response);
    res.redirect("dashboard")
    console.log("Deleted SuccessFully");
    console.log("User Deleted a Todo list")
  })
  .catch((error)=>{
    console.log(error);
  })
})

app.post("/user",(req,res)=>{
    console.log(req.body);
    let form = new userModel(req.body)
    console.log(form)
    form.save()
    .then((response)=>{
      console.log(response)
      res.render("todo", { message : "Todo Added Successfully" })
      console.log("SuccessFully Saved into the Database");
      // res.render("todo",{message:"Registration Completed"})
    })
    .catch((error)=>{
        console.log(error)
        console.log("Information not saved to the database ");
    })
  })



app.listen("3000",()=>{
    console.log("Server Started...............")
    console.log("Server Started on port 3000")
})


const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const day = now.getDate();
const dateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
console.log(`Todays Date is ${dateString}`);