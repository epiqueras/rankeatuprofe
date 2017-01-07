import { Router } from 'express';
import * as TeachersController from '../controllers/teachers.controller';

const router = new Router();

router.route('/profesor/:slug').get(TeachersController.getTeacher);

export default router;
