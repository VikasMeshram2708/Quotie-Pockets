import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import morgan from "morgan";
import allRoutes from '../routes/allRoutes';

// Middlewares
app.use(morgan('dev'));
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

app.use('/api', allRoutes);

export default app;
