import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';

const router = Router();

// Routes for the /auth endpoint
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/logout', AuthController.logout);

// get routes can be done in frontend(???)

export default router;