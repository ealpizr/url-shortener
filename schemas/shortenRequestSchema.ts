import { z } from "zod";

const schema = z.object({
  url: z
    .string({ required_error: "url is required" })
    .url({ message: "url is invalid" }),
});

export default schema;
