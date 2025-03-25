import Task from "../models/task.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
const createTask = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        throw new ApiError(400,"title is required");
    }
    const task = new Task({
        title,
        description,
    })
    await task.save();
    res.status(201).json(new ApiResponse(201,{ task }, "task created successfully"));
})

const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({});
    if (!tasks) {
        throw new ApiError(404,"no tasks found");
    }
    res.status(200).json(new ApiResponse(200,{tasks},"tasks fetched successfully"));
})

const updateTask = asyncHandler(async (req, res) => { 
    const { id } = req.params;
    const { title, description ,completed} = req.body;
    if (!id) {
        throw new ApiError(400,"id is required");
    }
    if (!title &&!description && !completed) {
        throw new ApiError(400,"title or description or completed is required");
    }

    const task = await Task.findByIdAndUpdate(id, { title, description,completed }, { new: true });
    if (!task) { 
        throw new ApiError(404,"task not found");
    }
    res.status(200).json(new ApiResponse(200,{ task}, "task updated successfully"));
})

const deleteTask = asyncHandler(async (req, res) => { 
    const { id } = req.params;
    if (!id) {
        throw new ApiError(400,"id is required");
    }
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
        throw new ApiError(404,"task not found");
    }
    res.status(200).json(new ApiResponse(200,{task}, "task deleted successfully"));
});

export { createTask, getTasks, updateTask, deleteTask };