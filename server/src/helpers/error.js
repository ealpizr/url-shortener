/* eslint-disable max-classes-per-file */
import {
  InternalErrorResponse,
  BadRequestResponse,
  NotFoundResponse,
  MethodNotAllowedResponse,
} from "./response";

const ErrorType = {
  INTERNAL_ERROR: "InternalServerError",
  BAD_REQUEST: "BadRequestError",
  NOT_FOUND: "NotFoundError",
  METHOD_NOT_ALLOWED: "MethodNotAllowedError",
};

export class ApiError extends Error {
  constructor(type, message) {
    super(message);
    this.name = type;
  }

  static handle(err, res) {
    switch (err.name) {
      case ErrorType.INTERNAL_ERROR:
        return new InternalErrorResponse(err.message).send(res);
      case ErrorType.BAD_REQUEST:
        return new BadRequestResponse(err.message).send(res);
      case ErrorType.NOT_FOUND:
        return new NotFoundResponse(err.message).send(res);
      case ErrorType.METHOD_NOT_ALLOWED:
        return new MethodNotAllowedResponse(err.message).send(res);
      default: {
        console.log(err);
        return new InternalErrorResponse("Something wrong happened").send(res);
      }
    }
  }
}

export class InternalError extends ApiError {
  constructor(message = "Internal Server Error") {
    super(ErrorType.INTERNAL_ERROR, message);
  }
}

export class BadRequestError extends ApiError {
  constructor(message = "Bad Request") {
    super(ErrorType.BAD_REQUEST, message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Not Found") {
    super(ErrorType.NOT_FOUND, message);
  }
}

export class MethodNotAllowedError extends ApiError {
  constructor(message = "Method Not Allowed") {
    super(ErrorType.METHOD_NOT_ALLOWED, message);
  }
}
