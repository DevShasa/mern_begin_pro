import app from "./app";
import env from "../src/util/validateEnv";
import mongoose from "mongoose";
const port = env.PORT;

mongoose.set('strictQuery', false);


mongoose.connect(env.MONGO_CONNECTION_STRING)
    .then(()=>{
        console.log("😚: Mongoose connected")
        app.listen(port, ()=>{
            console.log(`🥰: Server listening at port ${port}`)
        })
    })
    .catch(console.error)