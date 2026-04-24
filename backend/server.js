import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors"
import urlRouter from "./routes/url.routes.js"

dotenv.config()

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to mongodb");

        app.listen(process.env.PORT, () => {
            console.log("req hit");

            console.log(`App is listening in the port number ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("Error setting up the mongodb connection :- " + err);

    })


const errorHandler = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
}

app.use(errorHandler);
app.use('/', urlRouter);

export { app }