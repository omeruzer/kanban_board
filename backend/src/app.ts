import express from "express";
import { AppDataSource } from "./typeorm.config";
import taskRoutes from "./api/task/task.route";
const cors = require("cors");
import bodyParser from "body-parser";

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("MongoDB connected");
    app.use(cors());
    app.use(bodyParser.json());
    app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );

    app.use("/api", taskRoutes);

    app.listen(4000, () => {
      console.log(`Server running on http://localhost:4000`);
    });
  })
  .catch((error: string) => console.log(error));
