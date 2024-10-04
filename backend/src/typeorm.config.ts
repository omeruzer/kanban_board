
import { DataSource } from 'typeorm';
import { Task } from './api/task/task.entity';

export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: "mongodb+srv://<username>:<password>@cluster0.mongodb.net/kanban",
  useNewUrlParser: true,
  useUnifiedTopology: true,
  synchronize: true,
  logging: false,
  entities: [Task],
});
                