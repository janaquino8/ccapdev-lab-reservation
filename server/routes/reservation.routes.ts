import { Router } from 'express';
import * as ReservationController from '../controllers/reservation.controller.js';

const router = Router();

// Routes for the /reservations endpoint
router.post('/', ReservationController.createReservation);
router.get('/', ReservationController.getAllReservations);
router.get('/active', ReservationController.getAllActiveReservations);
router.get('/active-ongoing', ReservationController.getAllActiveAndOngoingReservations);
router.get('/non-cancelled', ReservationController.getAllNonCancelledReservations);

// Routes for the /reservations/:id endpoint
router.get('/:id', ReservationController.getReservationById);
router.put('/:id', ReservationController.updateReservation);
router.delete('/:id', ReservationController.deleteReservation);

// Miscellaneous routes
router.post('/search', ReservationController.getFilteredReservations);

export default router;
