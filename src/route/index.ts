import { Router } from 'express';
import { redirectToDashboard } from '../controller';
import { test } from '../controller/user';
const router = Router();

router.get('/', redirectToDashboard);

router.get('/ping');

router.get('/user', test);

export default router;
