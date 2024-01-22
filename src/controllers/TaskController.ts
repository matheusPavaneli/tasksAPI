import { Request, Response } from 'express';

import { TaskModel, TaskDocument } from '../models/Task';
import errorHandler from '../utils/errorHandler';
import idHandler from '../utils/idHandler';
import successHandler from '../utils/successHandler';
import toggleHandler from '../utils/toggleHandler';

class TaskController {
  async index(req: Request, res: Response) {
    try {
      const tasksInDB: TaskDocument[] = await TaskModel.find();

      successHandler(res, 200, { message: '', task: tasksInDB });
    } catch (error) {
      if (error instanceof Error) {
        return errorHandler(res, 500, error.message);
      }
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { content }: { content: string } = req.body;
      const formattedContent = content.trim();

      if (!formattedContent) {
        return errorHandler(res, 400, 'the field content must not be blank');
      }

      const taskAlreadyExists: TaskDocument | null = await TaskModel.findOne({
        content: formattedContent,
      });

      if (taskAlreadyExists) {
        return errorHandler(res, 409, 'task already exists');
      }

      const newTask: TaskDocument = new TaskModel({
        content: formattedContent,
      });

      await newTask.save();
      successHandler(res, 201, { message: 'task created', task: newTask });
    } catch (error) {
      if (error instanceof Error) {
        return errorHandler(res, 500, error.message);
      }
    }
  }

  async delete(req: Request, res: Response) {
    const id = idHandler(req);

    if (!id) {
      return errorHandler(res, 400, 'id not provided');
    }

    try {
      const taskToRemove: TaskDocument | null =
        await TaskModel.findByIdAndDelete(id);

      if (!taskToRemove) {
        return errorHandler(res, 404, 'task not found');
      }

      successHandler(res, 200, {
        message: 'task deleted',
        task: taskToRemove,
      });
    } catch (error) {
      if (error instanceof Error) {
        return errorHandler(res, 500, error.message);
      }
    }
  }

  async update(req: Request, res: Response) {
    const id = idHandler(req);

    if (!id) {
      return errorHandler(res, 400, 'id not provided');
    }

    const { content }: { content: string } = req.body;
    const formattedContent = content.trim();

    if (!formattedContent) {
      return errorHandler(res, 400, 'the field content must not be blank');
    }

    try {
      const taskToUpdate: TaskDocument | null = await TaskModel.findById(id);

      if (!taskToUpdate) {
        return errorHandler(res, 404, 'task not found');
      }

      if (taskToUpdate.content === content) {
        return errorHandler(
          res,
          400,
          'The content is the same, no changes made.',
        );
      }
      taskToUpdate.content = formattedContent;
      taskToUpdate.updated_at = new Date();
      taskToUpdate.expires_in = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      await taskToUpdate.save();

      successHandler(res, 200, {
        message: 'task successfully edited',
        task: taskToUpdate,
      });
    } catch (error) {
      if (error instanceof Error) {
        return errorHandler(res, 500, error.message);
      }
    }
  }

  async toggleComplete(req: Request, res: Response) {
    const id = idHandler(req);

    if (!id) {
      return errorHandler(res, 400, 'id not provided');
    }

    try {
      const taskToToggle: TaskDocument | null = await TaskModel.findById(id);

      if (!taskToToggle) {
        return errorHandler(res, 404, 'task not found');
      }

      await toggleHandler(taskToToggle);

      successHandler(res, 200, {
        message: 'Task status toggled',
        task: taskToToggle,
      });
    } catch (error) {
      if (error instanceof Error) {
        return errorHandler(res, 500, error.message);
      }
    }
  }
}

export default new TaskController();
