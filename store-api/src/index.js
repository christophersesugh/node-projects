import express from "express";
import dotenv from "dotenv";
import "express-async-errors";

import connectDB from "./database/index.js";
import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";
import products from "./routes/products.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    "<h1>Store API</h1><h4><a href='/api/v1/products'>Products route</a></h4>"
  );
});

app.use("/api/v1/products", products);

// custom middlewares
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  await connectDB(MONGO_URI, () => {
    console.log(`Connected to DB`);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
};

start();
