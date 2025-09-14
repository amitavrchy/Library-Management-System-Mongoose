import connectDB from "../config/db";
import express, { Application, Request, Response } from "express";

connectDB();
const app: Application = express();

app.use(express.json())

app.get("/", (req : Request, res: Response) => {
    res.send("Library Server is running");
})

export default app;