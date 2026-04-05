import { Router } from 'express';
import { checkAuth } from '../controllers/auth.controller.js';
import { verifyAndRollSession } from '../controllers/auth.middleware.js';
import * as AuthController from '../controllers/auth.controller';

const router = Router();

// Routes for the /auth endpoint
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/logout', AuthController.logout);
router.get('/check', verifyAndRollSession, checkAuth);
router.get('/setup-admin', AuthController.setupAdmin);

// get routes can be done in frontend(???)

export default router;