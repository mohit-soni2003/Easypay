const express = require("express");
const connectDB = require("./src/config/dbconfig");
require("dotenv").config();



const port =  process.env.PORT||3000;
const app = express()
connectDB();


app.use(express.json());

app.use("/auth",require("./src/routes/authRoutes"))
app.use("/bank",require("./src/routes/bank.route"))
app.use("/core-bank/account",require("./src/routes/coreBankAccount.route"))
app.use("/linked-bank/account",require("./src/routes/linkedbankAcc.route"))
app.use("/wallet",require("./src/routes/wallet.route"))


app.get("/", (req,res)=>{
    res.send("WELCOME TO THE MOHIT SERVER")
})
app.get("/test", (req,res)=>{
    res.send("SERVER  IS RUNNING FINE ON THE TEST COMPLETED....")
})



app.listen(port,()=>{
    console.log(`Server is running fine on Port : ${port}`);
})