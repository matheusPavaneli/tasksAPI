import mongoose, { Document, Schema } from 'mongoose';

export interface TaskDocument extends Document {
  content: string;
  isComplete: boolean;
  created_at: Date;
  updated_at: Date;
  expires_in: Date;
}

const taskSchema = new Schema<TaskDocument>({
  content: { type: String, required: true, unique: true, default: '' },
  isComplete: { type: Boolean, required: false, unique: false, default: false },
  created_at: {
    type: Date,
    required: false,
    unique: false,
    default: new Date(),
  },
  updated_at: { type: Date, required: false, unique: false, default: null },
  expires_in: {
    type: Date,
    required: false,
    unique: false,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
});

export const TaskModel = mongoose.model<TaskDocument>('Task', taskSchema);
