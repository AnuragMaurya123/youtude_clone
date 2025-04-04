import express from "express"

const app=express()

app.use((req,res)=>{
    res.json("api is working")
})

const Port=4000

app.listen(Port,()=>{
    console.log(Port);
})