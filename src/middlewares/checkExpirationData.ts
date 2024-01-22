import { Request, Response, NextFunction } from 'express';

import { TaskModel, TaskDocument } from '../models/Task';
import errorHandler from '../utils/errorHandler';

export default async (req: Request, res: Response, next: NextFunction) => {
  const todayDate: Date = new Date();

  try {
    const getInvalidTasks: TaskDocument[] = await TaskModel.find({
      expires_in: { $lte: todayDate }
    });

    if (getInvalidTasks.length > 0) {
      for (const task of getInvalidTasks) {
        await task.deleteOne();
      }
    }

    return next();
  } catch (error) {
    if (error instanceof Error) {
      return errorHandler(res, 500, error.message);
    }
  }
};
