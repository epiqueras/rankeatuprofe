import { Router } from 'express';
// import { ensureLoggedIn } from 'connect-ensure-login';
import * as AdminsController from '../controllers/admins.controller';

const router = new Router();

router.route('/admin-login').post(AdminsController.login);

router.route('/admin-logout').get(AdminsController.logout);

router.route('/admin-check-auth').get(AdminsController.checkAuth);

router.route('/admin-get-pendings').get(AdminsController.getPendings);

export default router;
