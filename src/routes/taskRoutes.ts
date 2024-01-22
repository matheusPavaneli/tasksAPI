import { Router } from 'express';
const router = Router();

import TaskController from '../controllers/TaskController';

router.get('/', TaskController.index);
router.post('/', TaskController.store);
router.put('/:id?', TaskController.update);
router.delete('/:id?', TaskController.delete);
router.get('/complete/:id?', TaskController.toggleComplete);

export default router;
