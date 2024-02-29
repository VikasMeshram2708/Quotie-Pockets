import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import morgan from "morgan";

// Middlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// routes
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "hello,world!",
  });
});

export default app;
