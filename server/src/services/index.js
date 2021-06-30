import { BadRequestError } from "../helpers/error";

export default class Services {
  static shorten(req) {
    return new Promise((resolve, reject) => {
      const { url } = req.body;

      if (!url) {
        return reject(new BadRequestError("Bad Request, url is required"));
      }

      resolve("ok");
    });
  }
}
