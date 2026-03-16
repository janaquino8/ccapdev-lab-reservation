import { Reservation } from '../models/Reservation.ts';
import { Request, Response } from "express";

export async function createReservation(req: Request, res: Response) {
    try {
        const details = req.body;

        const reservation = await Reservation.create(details);
        res.status(201).send(reservation);
    } catch (err: any) {
        console.error(err);
        res.status(500).send({error: err.message});
    }
}

export async function getAllReservations(req: Request, res: Response) {
    try {
        const reservation = await Reservation.find({});
        res.status(200).send(reservation);
    } catch (err: any) {
        console.error(err);
        res.status(500).send({error: err.message});
    }
}

export async function getReservationById(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const reservation = await Reservation.findById(id);

        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found.' });
        }
        res.status(200).send(reservation);
    } catch (err: any) {
        console.error(err);
        res.status(500).send({error: err.message});
    }
}

export async function getFilteredReservations(req: Request, res: Response) {
    try {
        const reservations = await Reservation.find(req.body);

        if (!reservations) {
            return res.status(404).json({ message: 'No reservations found.' });
        }
        res.status(200).send(reservations);
    } catch (err: any) {
        console.error(err);
        res.status(500).send({error: err.message});
    }
}

export async function updateReservation(req: Request, res: Response) {
    try {
        const id = req.params.id;

        // Prevent updating with an empty object
		if (Object.keys(req.body).length === 0) {
			return res.status(400).json({ message: 'No update fields provided.' });
		}

        const reservation = await Reservation.findByIdAndUpdate(id, req.body, { new: true });

        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found.' });
        }
        res.status(200).send(reservation);
    } catch (err: any) {
        console.error(err);
        res.status(500).send({error: err.message});
    }
}

export async function deleteReservation(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const deletedReservation = await Reservation.findByIdAndDelete(id);

        if (deletedReservation === null) {
            return res.status(404).json({ message: 'Reservation not found.' });
        }

        res.status(200).json({ message: 'Reservation deleted successfully.' });
    } catch (err: any) {
        console.error(err);
        res.status(500).send({error: err.message});
    }
}