import cryptoRandomString from "crypto-random-string";
import { isURL } from "validator";
import { BadRequestError, InternalError } from "../helpers/error";
import shortenedUrl from "../models";

const { BASE_URL } = process.env;

export default class Services {
  static shorten(req) {
    return new Promise((resolve, reject) => {
      const { url } = req.body;

      if (!url) {
        return reject(new BadRequestError("Bad Request, url is required"));
      }

      if (!isURL(url)) {
        return reject(new BadRequestError("Bad Request, invalid url"));
      }

      const code = cryptoRandomString({ length: 6, type: "url-safe" });

      shortenedUrl
        .create({
          code,
          url,
        })
        .then(d =>
          resolve({ originalUrl: d.url, shortenedUrl: `${BASE_URL}/${d.code}` })
        )
        .catch(e => {
          console.log(e);
          return reject(new InternalError());
        });
    });
  }

  static redirect(req) {
    return new Promise((resolve, reject) => {
      const { code } = req.params;
      shortenedUrl.findOne({ code }, (err, doc) => {
        if (err) {
          return reject(new InternalError());
        }
        if (!doc) {
          return reject(new BadRequestError("Bad Request, invalid code"));
        }
        return resolve({
          url: doc.url,
        });
      });
    });
  }
}
