import connectDB from "../config/db";
import express, { Application, Request, Response } from "express";
import bookRoutes from "..//routes/bookRoutes";
import borrowRoutes from "../routes/borrowRoutes";

connectDB();
const app: Application = express();

app.use(express.json())

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

app.get("/", (req : Request, res: Response) => {
    res.send("Library Server is running");
})

export default app;