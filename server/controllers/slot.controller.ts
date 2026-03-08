import Slot from '../models/Slot.ts';
import Laboratory from '../models/Laboratory.ts';
import { Request, Response } from "express";

export async function createSlot(req: Request, res: Response) {
    try {
        const slot = await Slot.create(req.body);

        await Laboratory.updateOne(
            { name: slot.laboratory },

            { $push: { slots: slot } }
        )

        res.status(201).send(slot);
    } catch (err: any) {
        console.error(err);
        res.status(500).send({error: err.message});
    }
}

export async function getAllSlots(req: Request, res: Response) {
    try {
        const slot = await Slot.find({});
        res.status(200).send(slot);
    } catch (err: any) {
        console.error(err);
        res.status(500).send({error: err.message});
    }
}

export async function getSlotById(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const slot = await Slot.findById(id);

        if (!slot) {
            return res.status(404).json({ message: 'Slot not found.' });
        }
        res.status(200).send(slot);
    } catch (err: any) {
        console.error(err);
        res.status(500).send({error: err.message});
    }
}

export async function getSlotsByFilter(req: Request, res: Response) {
    // search for slots
}

export async function updateSlot(req: Request, res: Response) {
    try {
        const id = req.params.id;

        // Prevent updating with an empty object
		if (Object.keys(req.body).length === 0) {
			return res.status(400).json({ message: 'No update fields provided.' });
		}

        const slot = await Slot.findByIdAndUpdate(id, req.body, { new: true });

        if (!slot) {
            return res.status(404).json({ message: 'Slot not found.' });
        }
        res.status(200).send(slot);
    } catch (err: any) {
        console.error(err);
        res.status(500).send({error: err.message});
    }
}

export async function deleteSlot(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const deletedSlot = await Slot.findByIdAndDelete(id);

        if (deletedSlot === null) {
            return res.status(404).json({ message: 'Slot not found.' });
        }

        res.status(200).json({ message: 'Slot deleted successfully.' });
    } catch (err: any) {
        console.error(err);
        res.status(500).send({error: err.message});
    }
}