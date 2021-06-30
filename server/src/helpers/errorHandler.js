import { ApiError, BadRequestError, InternalError } from "./error";

export default (err, _, res, __) => {
  if (err instanceof ApiError) {
    return ApiError.handle(err, res);
  }

  /*
    express.json throws a syntax error when
    the request body contains invalid json
  */
  if (err instanceof SyntaxError && err.statusCode === 400) {
    return ApiError.handle(
      new BadRequestError("Bad Request, Invalid JSON"),
      res
    );
  }

  console.log(err);
  ApiError.handle(new InternalError(), res);
};
