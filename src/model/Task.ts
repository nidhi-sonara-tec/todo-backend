import { Document } from "mongodb";
import mongoose, { Schema, Types } from "mongoose";

// Define the interface representing a Task document
export interface TaskDocument extends Document {
  title: string;
  description: string;
  assignee: string;
  type: string;
  currentStateId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

let TaskSchema = new Schema<TaskDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    assignee: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    currentStateId: { type: Schema.Types.ObjectId, ref: "TaskStatus" },
  },
  { timestamps: true }
);

export const Tasks = mongoose.model<TaskDocument>("Task", TaskSchema);
