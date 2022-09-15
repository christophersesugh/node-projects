import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/index.js";

import tasks from "./routes/tasks.js";
import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.static("./public"));
app.use(express.json());
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  await connectDB(MONGO_URI, () => {
    console.log(`Connected to DB!`);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
};

start();
