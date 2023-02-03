import "dotenv/config";
import express, {NextFunction, Request, Response} from "express"
import notesRoutes from "./routes/notes";
import morgan from "morgan";
import createHttpError, {isHttpError} from "http-errors";
// import cors from "cors";

const app = express();
app.use(morgan("dev"))

// const allowedOrigins = ["http://localhost:5173"]
// const options:cors.CorsOptions = {
//     origin:allowedOrigins
// }

// app.use(cors(options)) // Access-Control-Allow-Origin: http://localhost:5173
//app.use(cors())  -> Access-Control-Allow-Origin:* 


app.use(express.json())

app.use("/api/notes", notesRoutes)

app.use((req, res, next)=>{
    next(createHttpError(404, "🫠: Endpoint not found"))
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error:unknown, req:Request, res:Response, next:NextFunction)=>{
    console.log(error)
    let errorMessage = error || "An unknown error occurred";
    let statusCode = 500;
    if(isHttpError(error)){
        statusCode = error.status
        errorMessage = error.message
    }
    //if(error instanceof Error) errorMessage = error.message
    res.status(statusCode).json({error:errorMessage})
})

export default app