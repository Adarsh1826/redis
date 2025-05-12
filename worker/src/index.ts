import { createClient } from "redis";
const client = createClient()
async function polling() {
    while(1){
        const response = await client.brPop('submission',0)
        console.log(response);
        await new Promise((resolve)=>setTimeout(resolve,1000))
    }
}
async function startServer() {
    try {
        await client.connect()
        console.log("Worker is up");
        
    } catch (error) {
        console.log(error);
    }
}
startServer()
polling()