import "dotenv/config";
import express from "express";
import db from "./db";
import routes from "./routes";
import swagger from 'swagger-ui-express';
import swaggerDoc from '../swagger.json'
import errorHandler from "./helpers/errorHandler";
import { NotFoundError } from "./helpers/error";

const { EXPRESS_PORT, MONGO_CONNECTION_URI } = process.env;

const app = express();

app.use(express.json());
app.use('/api-docs', swagger.serve, swagger.setup(swaggerDoc))
app.use(routes);

app.use((_, __, next) => next(new NotFoundError()));
app.use(errorHandler);

db.connect(MONGO_CONNECTION_URI, () => {
  app.listen(EXPRESS_PORT, () => {
    console.log(`express running on port ${EXPRESS_PORT}`);
  });
});
