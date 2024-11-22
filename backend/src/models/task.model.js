import mongoose, { Schema } from 'mongoose'

const TaskSchema = new Schema({
    taskData: {
        type: String
    }
},{timestamps: true})

export const Task = mongoose.model('Task', TaskSchema)