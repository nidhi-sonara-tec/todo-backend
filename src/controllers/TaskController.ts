import { Request, Response } from "express";

import mongoose from "mongoose";
import { TaskDocument, Tasks } from "../model/Task";
import { TasksStatuses } from "../model/TaskStatus";

//List of tasks
export async function tasksList(req: Request, res: Response) {
  const tasks: TaskDocument[] = await Tasks.find({});
  res.json(tasks);
}

//Create new task
export async function createTask(req: Request, res: Response) {
  const { title, type, description, assignee, currentStateId } = req.body;
  const task = await Tasks.create({
    title,
    type,
    description,
    assignee,
    currentStateId,
  })
    .then((task: any) => {
      task.save();
      res.json(task);
    })
    .catch((error) => {
      res.status(400).json(error.message);
    });
}

//Update task by id
export async function updateTask(req: Request, res: Response) {
  const taskId = req.params.id;
  const { title, type, description, assignee, currentStateId } = req.body;

  await Tasks.findByIdAndUpdate(
    taskId,
    {
      title,
      type,
      description,
      assignee,
      currentStateId,
    },
    { new: true }
  )
    .then((task: any) => {
      res.json(task);
    })
    .catch((error) => {
      res.json(error.message);
    });
}

//Delete task by id
export async function deleteTask(req: Request, res: Response) {
  const taskId = req.params.id;
  await Tasks.findOneAndDelete({ _id: taskId })
    .then((result) => {
      res.json({'message':'Task deleted successfully !!'});
    })
    .catch((error) => {
      res.status(200).json(error.messae);
    });
}

//Get task by id
export async function getTaskById(req: Request, res: Response) {
  const taskId = req.params.id;
  await Tasks.findOne({ _id: taskId })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(404).json(error.messae);
    });
}

//List of tasks status
export async function tasksStatusList(req: Request, res: Response) {
  await TasksStatuses.find({})
    .then((tasksStatus) => {
      res.json(tasksStatus);
    })
    .catch((error) => {
      res.json(error.messae);
    });
}

export async function tasksByStatusID(req: Request, res: Response) {
  const id = req.params.id;

  // Check if the ID format is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  await Tasks.aggregate([
    {
      $match: {
        currentStateId: new mongoose.Types.ObjectId(id), // Match tasks by the provided taskStatusId
      },
    },
    {
      $lookup: {
        from: "taskstatuses", // Collection name for TaskStatus model
        localField: "currentStateId",
        foreignField: "_id",
        as: "statusDetails",
      },
    },
    {
      $unwind: "$statusDetails", // Unwind the statusDetails array
    },
  ])
    .exec()
    .then((result) => {
      res.json(result);
    });
}