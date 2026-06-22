const express = require("express");
const connectDB = require("./src/config/dbconfig");
require("dotenv").config();




const port =  process.env.PORT||3000;
const app = express()
connectDB();

app.use(express.json());

app.use("/auth",require("./src/routes/authRoutes"))


app.get("/", (req,res)=>{
    res.send("WELCOME TO THE MOHIT SERVER")
})
app.get("/test", (req,res)=>{
    res.send("SERVER  IS RUNNING FINE ON THE TEST COMPLETED....")
})





app.listen(port,()=>{
    console.log(`Server is running fine on Port : ${port}`);
})