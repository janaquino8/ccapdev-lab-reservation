import { Router } from 'express';
import * as UserController from '../controllers/user.controller.js';

const router = Router();

// Routes for the /users endpoint
router.post('/', UserController.createUser);
router.get('/', UserController.getAllUsers);

// Miscellaneous routes
router.get('/search', UserController.getUsersByName); // put before id routes?
router.get('/username/:user', UserController.getUserByUsername);
router.get('/searchusers', UserController.searchUsers);

// Routes for the /users/:id endpoint
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.post('/:id/reservations', UserController.getUserReservations);

export default router;
