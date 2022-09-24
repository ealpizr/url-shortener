class InvalidRequestError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

export default InvalidRequestError;
