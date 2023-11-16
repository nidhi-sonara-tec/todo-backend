import { createTask, deleteTask, getTaskById, tasksByStatusID, tasksList, tasksStatusList, updateTask } from "@controllers/TaskController";
import { limiter } from "@middlewares/limiter";

const express = require("express");

let router = express.Router();

//Get List of tasks status
router.get('/status',tasksStatusList)

//Get List of tasks by status ID
router.get('/status/:id',tasksByStatusID)

//Get all tasks
router.get("/", limiter , tasksList);

//Add new task
router.post("/", limiter , createTask);

//Update task by task id
router.put("/:id", limiter , updateTask);

//Delete task by task id
router.delete("/:id", limiter , deleteTask);

//Get task by id
router.get("/:id", limiter , getTaskById);

export default router;


