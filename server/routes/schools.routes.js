import { Router } from 'express';
import * as SchoolsController from '../controllers/schools.controller';

const router = new Router();

router.route('/escuela/:slug').get(SchoolsController.getSchool);

router.route('/escuela/:slug/agregar').post(SchoolsController.addTeacher);

export default router;
