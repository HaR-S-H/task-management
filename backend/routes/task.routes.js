import express from "express";
import { getTasks,createTask,deleteTask,updateTask } from "../controllers/task.controllers.js";
const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);


export default router;