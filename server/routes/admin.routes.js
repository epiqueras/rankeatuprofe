import { Router } from 'express';
import * as AdminController from '../controllers/admin.controller';

const router = new Router();

router.route('/admin-login').get(AdminController.login);

router.route('/admin-session').get(AdminController.session);

router.route('/admin-logout').get(AdminController.logout);

export default router;
