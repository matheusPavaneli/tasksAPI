import { Response } from 'express';

interface SucessResponse<T = unknown> {
  message?: string;
  task?: T;
}

export default <T = unknown>(
  res: Response,
  statusCode: number,
  options?: SucessResponse<T>,
): void => {
  const { message, task } = options || {};

  if (task) {
    if (message) {
      res.status(statusCode).json({ message, task });
    } else {
      res.status(statusCode).json({ task });
    }
  } else {
    res.status(statusCode).json({ message });
  }
};
