import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import "express-async-errors";
import connectDB from "./database/index.js";
import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";
import jobs from "./routes/jobs.js";
import authentication from "./routes/authentication.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss());

app.get("/", (req, res) => {
  res.send("<h1>Jobs API</h1><h4><a href='/api/v1/jobs'>Jobs route</a></h4>");
});

app.use("/api/v1/auth", authentication);
app.use("/api/v1/jobs", jobs);

// custom middlewares
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  // await connectDB(MONGO_URI, () => {
  //   console.log(`Connected to DB`);
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  // });
};

start();
