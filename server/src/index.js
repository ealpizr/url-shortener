import "dotenv/config";
import db from "./db";

const { MONGO_CONNECTION_URI } = process.env;

db.connect(MONGO_CONNECTION_URI);
