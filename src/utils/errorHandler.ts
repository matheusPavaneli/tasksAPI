import { Response } from 'express';

interface errorResponse {
  error: string;
  details?: string;
}

export default (
  res: Response,
  statusCode: number,
  message: string,
): Response<errorResponse> => {
  if (statusCode >= 400 && statusCode < 600) {
    return res.status(statusCode).json({ error: message });
  } else {
    console.log(`Invalid status code: ${statusCode}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
