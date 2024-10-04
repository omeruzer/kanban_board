import { Router } from "express";
import { taskController } from "./task.controller";
import { taskValidation } from "./task.validation";

const router = Router();

router.get("/tasks", taskController.getAllTasks);
router.get(
  "/tasks/status/list",
  taskValidation.statusTaskValidation,
  taskController.getStatusTasks
);
router.get("/tasks/:id", taskController.getTaskById);
router.post(
  "/tasks",
  taskValidation.createTaskValidation,
  taskController.createTask
);
router.put(
  "/tasks/:id",
  taskValidation.updateTaskValidation,
  taskController.updateTask
);
router.delete("/tasks/:id", taskController.deleteTask);

export default router;
