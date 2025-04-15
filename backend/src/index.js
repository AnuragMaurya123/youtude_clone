import 'dotenv/config'
import dbConnect from '../db/index.js'
import { app } from './app.js';

dbConnect()
.then(() => {
    const port=process.env.PORT || 8000
    app.listen(port,()=>{
        console.log("Server is running on Port",port);
    }) 
    app.on("error",(error)=>{
        console.error("Error in app while listen",error);
        
    })
})
.catch((error)=>{
    console.error("Mongo Database Connection",error); 
})


