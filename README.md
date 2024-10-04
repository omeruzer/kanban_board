
# Kanban App - Full Stack Application

This is a full-stack Kanban application with **Node.js** for the backend and **React.js** for the frontend. The application allows you to manage tasks and their statuses through a simple Kanban board interface.

## Project Structure

```
.
├── backend                # Backend application (Node.js, Express, TypeScript)
├── frontend               # Frontend application (React.js)
├── docker-compose.yml      # Docker Compose configuration
└── README.md              # Project documentation
```

---

## Backend

The backend is built using **Node.js** and **Express**, and it uses **TypeORM** for database management with MongoDB. You will need to configure the database settings before running the application.

### Prerequisites

- [Node.js](https://nodejs.org/) and npm installed on your system
- A **MongoDB** database connection string

### Setup and Run the Backend

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. **Database Configuration**: Open the `src/typeorm.config.ts` file and enter your MongoDB URL in the `url` property. Example:

   ```typescript
   export const dataSourceOptions: DataSourceOptions = {
     type: 'mongodb',
     url: 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/kanban',
     useNewUrlParser: true,
     useUnifiedTopology: true,
     synchronize: true,
     logging: true,
     entities: [Task], // Make sure your entities are imported
   };
   ```

4. Run the backend using **nodemon** for automatic restarts during development:

   ```bash
   npm run dev
   ```

   If you don't have **nodemon** installed globally, you can install it by running:

   ```bash
   npm install -g nodemon
   ```

5. The backend will run on `http://localhost:4000`.

### API Endpoints

Here is a list of the available API endpoints for managing tasks:

| Method | Endpoint                  | Description                           |
|--------|----------------------------|---------------------------------------|
| GET    | `/tasks`                   | Retrieve all tasks                    |
| GET    | `/tasks/status/list`        | Retrieve tasks by status              |
| GET    | `/tasks/:id`                | Retrieve a task by its ID             |
| POST   | `/tasks`                   | Create a new task                     |
| PUT    | `/tasks/:id`                | Update a task by its ID               |
| DELETE | `/tasks/:id`                | Delete a task by its ID               |

### Validation

The following validation is applied to certain API requests:

- **Status Task Validation**: Applied on the `/tasks/status/list` endpoint.
- **Create Task Validation**: Applied when creating new tasks.
- **Update Task Validation**: Applied when updating existing tasks.

The validation logic is defined in `task.validation.js`.

---

## Frontend

The frontend is built using **React.js** and interacts with the backend API to display tasks in a Kanban-style board.

### Prerequisites

- [Node.js](https://nodejs.org/) and npm installed on your system

### Setup and Run the Frontend

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm run start
   ```

4. The frontend will run on `http://localhost:3000`.

---

## Docker Setup (Optional)

If you prefer to use Docker for running both frontend and backend services, you can use the provided `docker-compose.yml` file.

1. Run the following command to build and start both services:

   ```bash
   docker-compose up --build
   ```

2. Access the frontend at `http://localhost:3001` and the backend at `http://localhost:3000`.
