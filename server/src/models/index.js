import { Schema, model } from "mongoose";

const schema = new Schema({
  code: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

export default model("URL", schema);
