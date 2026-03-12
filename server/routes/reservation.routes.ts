import { Router } from 'express';
import * as ReservationController from '../controllers/reservation.controller';

const router = Router();

// Routes for the /reservations endpoint
router.post('/', ReservationController.createReservation);
router.get('/', ReservationController.getAllReservations);

// Routes for the /reservations/:id endpoint
router.get('/:id', ReservationController.getReservationById);
router.put('/:id', ReservationController.updateReservation);
router.delete('/:id', ReservationController.deleteReservation);

// Miscellaneous routes
router.get('/search', ReservationController.getFilteredReservations);

export default router;
