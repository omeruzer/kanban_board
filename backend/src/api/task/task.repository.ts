import { MongoRepository } from "typeorm";
import { Task } from "./task.entity";
import { AppDataSource } from "../../typeorm.config";
import { ObjectId } from "mongodb";

class TaskRepository {
  private repository: MongoRepository<Task>;

  constructor() {
    this.repository = AppDataSource.getMongoRepository(Task);
  }

  async findAll(): Promise<Task[]> {
    return await this.repository.find({ order: { createdAt: "DESC" } });
  }
  async findStatusAll(status: string): Promise<Task[]> {
    var queryStatus = "";
    if ((status == "todo")) {
      queryStatus = "To Do";
    } else if ((status == "inprogress")) {
      queryStatus = "In Progress";
    } else {
      queryStatus = "Done";
    }
    return await this.repository.find({
      where: { status: queryStatus },
      order: { createdAt: "DESC" },
    });
  }
  async findById(id: string): Promise<Task | null> {
    return await this.repository.findOneBy({ _id: new ObjectId(id) });
  }

  async create(title: string, description: string): Promise<Task> {
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = "To Do";
    return await this.repository.save(task);
  }

  async update(
    task: Task,
    title: string,
    description: string,
    status: "To Do" | "In Progress" | "Done"
  ): Promise<Task | null> {
    task.title = title;
    task.description = description;
    task.status = status;
    return await this.repository.save(task);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export const taskRepository = new TaskRepository();
