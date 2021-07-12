import { Router } from "express";
import Services from "../services";
import { MethodNotAllowedError } from "../helpers/error";
import { SuccessResponse } from "../helpers/response";

const router = Router();

router
  .route("/api/shorten")
  .post((req, res, next) =>
    Services.shorten(req)
      .then(data => new SuccessResponse(201, data).send(res))
      .catch(e => next(e))
  )
  .all(() => {
    throw new MethodNotAllowedError();
  });

router
  .route("/:code")
  .get((req, res, next) =>
    Services.redirect(req)
      .then(data => res.status(301).redirect(data.url))
      .catch(e => next(e))
  )
  .all(() => {
    throw new MethodNotAllowedError();
  });

export default router;
