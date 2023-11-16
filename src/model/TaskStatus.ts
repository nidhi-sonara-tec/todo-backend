import mongoose, { Schema } from "mongoose";

let TaskStatusSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
},{ timestamps: true });

 
export const TasksStatuses = mongoose.model('TaskStatus', TaskStatusSchema);
 