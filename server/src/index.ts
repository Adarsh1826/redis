import express, { json } from "express";
import { createClient } from "redis";
const client = createClient()
const app = express()
app.use(express.json())
app.post('/submit',async (req:any , res:any)=>{
    const {problemId ,userId , code , langugae} = req.body
    // push it into primary database

    // now push it into redis

    await client.lPush("submission",JSON.stringify({problemId,userId,code,langugae}))
    res.json({
        "message":"pushed successfullly"
    })
})
async function startServer() {
    try {
        await client.connect()
        console.log("Connected to redis");
        app.listen(3000,()=>{
            console.log("server is up");
        })
        
        
    } catch (error) {
        console.error(error)
    }
    
}
startServer()