import { Router } from 'express';
import * as SearchController from '../controllers/search.controller';

const router = new Router();

router.route('/busqueda/:type').get(SearchController.search);

export default router;
