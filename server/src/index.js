import "dotenv/config";
import express from "express";
import db from "./db";
import errorHandler from "./helpers/errorHandler";
import { SuccessResponse } from "./helpers/response";

const { EXPRESS_PORT, MONGO_CONNECTION_URI } = process.env;

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  new SuccessResponse(200, {}).send(res);
});

app.use(errorHandler);

db.connect(MONGO_CONNECTION_URI, () => {
  app.listen(EXPRESS_PORT, () => {
    console.log(`express running on port ${EXPRESS_PORT}`);
  });
});
