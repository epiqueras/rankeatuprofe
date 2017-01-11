import { Router } from 'express';
// import { ensureLoggedIn } from 'connect-ensure-login';
import * as AdminsController from '../controllers/admins.controller';

const router = new Router();

router.route('/admin-login').post(AdminsController.login);

router.route('/admin-logout').get(AdminsController.logout);

router.route('/admin-check-auth').get(AdminsController.checkAuth);

router.route('/admin-get-pendings').get(AdminsController.getPendings);

router.route('/admin-accept-teacher/:_id').put(AdminsController.acceptTeacher);

router.route('/admin-delete-teacher/:_id').delete(AdminsController.deleteTeacher);

router.route('/admin-accept-review/:_id').put(AdminsController.acceptReview);

router.route('/admin-delete-review/:_id').delete(AdminsController.deleteReview);

export default router;
