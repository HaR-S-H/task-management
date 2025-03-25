import express from "express";
import dotenv from "dotenv";
import connectedDB from "./db/connection.js";
import taskRoute from "./routes/task.routes.js"
import cors from "cors";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    }
));

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/tasks", taskRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is listening at ${PORT}`);
    connectedDB();
})