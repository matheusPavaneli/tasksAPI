import { TaskDocument } from '../models/Task';

const calculateExpirationDate = (
  isComplete: boolean,
  updated_at: Date,
): Date => {
  const expirationTime = isComplete ? 24 : 7;
  return new Date(updated_at.getTime() + expirationTime * 60 * 60 * 1000);
};

export default async (taskToToggle: TaskDocument) => {
  taskToToggle.isComplete = !taskToToggle.isComplete;
  taskToToggle.updated_at = new Date();
  taskToToggle.expires_in = calculateExpirationDate(
    taskToToggle.isComplete,
    taskToToggle.updated_at,
  );

  await taskToToggle.save();
};
