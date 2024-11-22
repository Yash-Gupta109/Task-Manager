import dotenv from 'dotenv'
import express from "express"
import cors from "cors"
import connectDB from './src/db/index.js'
import {ApiError} from './src/utils/ApiError.js'
import { ApiResponse } from './src/utils/ApiResponse.js'
import { asyncHandler } from './src/utils/asyncHandler.js'
import {Task} from './src/models/task.model.js'

dotenv.config({
    path: './.env'
})
connectDB().then(()=>{
    const app = express() 

app.use(cors({
    origin: "*",
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', asyncHandler(async (req, res)=>{
    const tasks = await Task.find()
    if(!tasks || tasks.length === 0){
        throw new ApiError(404, "No Task Found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200, tasks, "All Tasks Found successfully")
    )
}))

app.post('/addTasks', asyncHandler(async (req, res)=>{
    const {taskData} = req.body
    if(!taskData){
        throw new ApiError(404, "Task Data not found")
    }
    const taskValue = await Task.create({taskData});
    return res
    .status(200)
    .json(
        new ApiResponse(200, taskValue, "Task Added Successfully!!")
    )
}))

app.put('/updateTask/:id', asyncHandler(async (req, res)=>{
    const {id} = req.params
    const {taskData} = req.body
    
    if(!taskData){
        throw new ApiError(404, "Task Data not found")
    }
    const updatedTask = await Task.findOneAndUpdate(
        {_id: id},
        {taskData},
        {new: true}
    )
    if(!updatedTask){
        throw new ApiError(404, "Task not found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200, updatedTask, "Task updated successfully")
    )
}))

app.delete('/deleteTask/:id', asyncHandler(async (req, res)=>{
    const {id} = req.params
    const deletedTask = await Task.findByIdAndDelete({_id: id});

    if (!deletedTask) {
        throw new ApiError(404, "Task not found");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, "Task Deleted successfully")
    )
}))

app.listen(8000, ()=>{
    console.log("app is running on port 8000...");
})
})

