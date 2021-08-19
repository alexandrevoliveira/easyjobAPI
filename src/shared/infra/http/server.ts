import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import "@shared/infra/typeorm";

import "@shared/container";

import { AppError } from "@shared/errors/AppError";

import { router } from "./routes";

const app = express();

// using this function to deal with cors policy
const allowCrossDomain = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  response.header("Access-Control-Allow-Headers", [
    "Content-Type",
    "Authorization",
  ]);
  response.header("Access-Control-Expose-Headers", "x-total-count"); // custom header required from the front-end application
  next();
};

app.use(allowCrossDomain);

app.use(express.json());

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
        statusCode: err.statusCode,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(3333, () => console.log("Server is running!"));
