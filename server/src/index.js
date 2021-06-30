import "dotenv/config";
import db from "./db";
import express from "express";

const { EXPRESS_PORT, MONGO_CONNECTION_URI } = process.env;

const app = express();

app.use(express.json());

db.connect(MONGO_CONNECTION_URI, () => {
  app.listen(EXPRESS_PORT, () => {
    console.log(`express running on port ${EXPRESS_PORT}`);
  });
});
