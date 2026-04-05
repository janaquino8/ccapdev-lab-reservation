import Laboratory from '../models/Laboratory.js';
import Reservation from '../models/Reservation.js';
import { Request, Response } from "express";

export async function createLaboratory(req: Request, res: Response) {
    try {
        const laboratory = await Laboratory.create(req.body);
        res.status(201).send(laboratory);
    } catch (err: any) {
        console.error(err);
        res.status(500).send({error: err.message});
    }
}

export async function getAllLaboratories(req: Request, res: Response) {
    try {
        const laboratory = await Laboratory.find({});
        res.status(200).send(laboratory);
    } catch (err: any) {
        console.error(err);
        res.status(500).send({error: err.message});
    }
}

export async function getLaboratoryById(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const laboratory = await Laboratory.findById(id);

        if (!laboratory) {
            return res.status(404).json({ message: 'Laboratory not found.' });
        }
        res.status(200).send(laboratory);
    } catch (err: any) {
        console.error(err);
        res.status(500).send({error: err.message});
    }
}

export async function updateLaboratory(req: Request, res: Response) {
    try {
        const id = req.params.id;

        // Prevent updating with an empty object
		if (Object.keys(req.body).length === 0) {
			return res.status(400).json({ message: 'No update fields provided.' });
		}

        const laboratory = await Laboratory.findByIdAndUpdate(id, req.body, { new: true });

        if (!laboratory) {
            return res.status(404).json({ message: 'Laboratory not found.' });
        }
        res.status(200).send(laboratory);
    } catch (err: any) {
        console.error(err);
        res.status(500).send({error: err.message});
    }
}

export async function deleteLaboratory(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const deletedLaboratory = await Laboratory.findByIdAndDelete(id);

        if (deletedLaboratory === null) {
            return res.status(404).json({ message: 'Laboratory not found.' });
        }

        res.status(200).json({ message: 'Laboratory deleted successfully.' });
    } catch (err: any) {
        console.error(err);
        res.status(500).send({error: err.message});
    }
}