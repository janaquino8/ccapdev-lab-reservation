import { Router } from 'express';
import * as UserController from '../controllers/user.controller';

const router = Router();

// Routes for the /users endpoint
router.post('/', UserController.createUser);
router.get('/', UserController.getAllUsers);

// Routes for the /users/:id endpoint
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.post('/:id/reservations', UserController.getUserReservations);

// Miscellaneous routes
router.get('/search', UserController.getUsersByName); // put before id routes?
router.get('/username/:user', UserController.getUserByUsername);

export default router;
