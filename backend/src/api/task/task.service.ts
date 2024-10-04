import { Task } from "./task.entity";
import { taskRepository } from "./task.repository";

class TaskService {
  async getAllTasks(): Promise<Task[]> {
    return await taskRepository.findAll();
  }
  async getStatusTasks(status:string): Promise<Task[]> {
    return await taskRepository.findStatusAll(status);
  }

  async getTaskById(id: string): Promise<Task | null> {
    return await taskRepository.findById(id);
  }

  async createTask(title: string, description: string): Promise<Task> {
    return await taskRepository.create(title,description);
  }

  async updateTask(
    task: Task,
    title: string,
    description: string,
    status: "To Do" | "In Progress" | "Done"
  ): Promise<Task | null> {
    return await taskRepository.update(task, title, description, status);
  }

  async deleteTask(id: string): Promise<void> {
    return await taskRepository.delete(id);
  }
}

export const taskService = new TaskService();
