import { Request } from 'express';

export default (req: Request): string | null => {
  const { id } = req.params;

  if (typeof id === 'string' && id.trim() !== '') {
    if (/^[0-9a-fA-F]{24}$/.test(id)) {
      return id;
    }
  }

  return null;
};
