import { Request, Response } from "express";
import { taskService } from "./task.service";
import { ErrorResponse, SuccessResponse } from "../../common/ServiceResponse";

class TaskController {
  async getAllTasks(req: Request, res: Response): Promise<Response> {
    const tasks = await taskService.getAllTasks();
    return SuccessResponse(res, tasks);
  }
  async getStatusTasks(req: Request, res: Response): Promise<Response> {
    const { status } = req.query;

    const tasks = await taskService.getStatusTasks(status as string);
    return SuccessResponse(res, tasks);
  }
  async getTaskById(
    req: Request,
    res: Response
  ): Promise<Response | undefined> {
    try {
      const { id } = req.params;
      const task = await taskService.getTaskById(id);

      if (!task) {
        return ErrorResponse(res, 404, "Task not Found!", task);
      }

      return SuccessResponse(res, task);
    } catch (error: any) {
      return ErrorResponse(res, 400, "Error", error.message);
    }
  }

  async createTask(req: Request, res: Response): Promise<Response> {
    const { title, description } = req.body;
    const task = await taskService.createTask(title, description);
    return SuccessResponse(res, task);
  }

  async updateTask(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { title, description, status } = req.body;
      const task = await taskService.getTaskById(id);

      if (!task) {
        return ErrorResponse(res, 404, "Task not Found!", task);
      }

      const data = await taskService.updateTask(
        task,
        title,
        description,
        status
      );

      return SuccessResponse(res, data);
    } catch (error: any) {
      return ErrorResponse(res, 400, "Error", error.message);
    }
  }

  async deleteTask(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const task = await taskService.getTaskById(id);
    if (!task) {
      return ErrorResponse(res, 404, "Task not Found!", task);
    }
    const data = await taskService.deleteTask(id);
    return SuccessResponse(res, task);
  }
}

export const taskController = new TaskController();
