const express= require("express");
const app=express();
const routes=require("./routes/route")

app.use(express.json());

app.use("/api",routes)

app.use("/*",(req,res)=>{
    return res.status(400).json("Api is running but Path is Invalid")
})



app.listen(3000,()=>{
    console.log("server is running on port "+3000);
})