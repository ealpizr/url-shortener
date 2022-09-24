interface IShortenSuccessResponse {
  message: string;
  slug: string;
}

interface IShortenErrorResponse {
  error: string;
  message: string;
}

type IShortenResponse = IShortenSuccessResponse | IShortenErrorResponse;

export default IShortenResponse;
