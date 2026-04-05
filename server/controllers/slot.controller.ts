import { Request, Response } from "express";
import Slot from '../models/Slot.js';
import Laboratory from '../models/Laboratory.js';
import Reservation from '../models/Reservation.js';

export async function createSlot(req: Request, res: Response) {
    try {
        const { name, laboratory } = req.body;

        const labDoc = await Laboratory.findOne({ name: laboratory });
        if (!labDoc) {
            return res.status(404).json({ message: 'Laboratory not found.' });
        }

        const slot = await Slot.create({ name, laboratory: labDoc._id });

        await Laboratory.findByIdAndUpdate(labDoc._id, { $push: { slots: slot._id } });

        res.status(201).send(slot);
    } catch (err: any) {
        console.error(err);
        res.status(500).send({error: err.message});
    }
}

export async function getAllSlots(req: Request, res: Response) {
    try {
        const slots = await Slot.find({})
            .populate('laboratory', 'name');
            
        res.status(200).send(slots);
    } catch (err: any) {
        console.error(err);
        res.status(500).send({error: err.message});
    }
}

export async function getSlotById(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const slot = await Slot.findById(id).populate('laboratory', 'name');

        if (!slot) {
            return res.status(404).json({ message: 'Slot not found.' });
        }
        res.status(200).send(slot);
    } catch (err: any) {
        console.error(err);
        res.status(500).send({error: err.message});
    }
}

export async function getFilteredSlots(req: Request, res: Response) {
    try {
        const { laboratory, startTime, endTime } = req.body;

        const labDoc = await Laboratory.findOne({ name: laboratory });
        if (!labDoc) {
            return res.status(404).json({ message: 'Laboratory not found.' });
        }

        const allSlotsInLab = await Slot.find({ laboratory: labDoc._id });

        const overlappingReservations = await Reservation.find({
            laboratory: labDoc._id,
            "reservedSlots.timeStart": { $lt: new Date(endTime) },
            "reservedSlots.timeEnd": { $gt: new Date(startTime) }
        });

        const reservedSlotIds = overlappingReservations.flatMap(res => 
            res.reservedSlots.map((rs: any) => rs.slot.toString())
        );

        const finalSlots = allSlotsInLab.filter(item => !reservedSlotIds.includes(item._id.toString()));

        if (finalSlots.length === 0) {
            return res.status(404).send({ message: "No available slots found for this time." });
        }
        res.status(200).send(finalSlots);
    } catch (err: any) {
        console.error(err);
        res.status(500).send({error: err.message});
    }
}

export async function updateSlot(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const updateData = { ...req.body };

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'No update fields provided.' });
        }

        if (updateData.laboratory) {
            const labDoc = await Laboratory.findOne({ name: updateData.laboratory });
            if (!labDoc) {
                return res.status(404).json({ message: 'Laboratory not found.' });
            }
            updateData.laboratory = labDoc._id;
        }

        const slot = await Slot.findByIdAndUpdate(id, updateData, { new: true })
            .populate('laboratory', 'name');

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

        if (!deletedSlot) {
            return res.status(404).json({ message: 'Slot not found.' });
        }

        await Laboratory.findByIdAndUpdate(deletedSlot.laboratory, {
            $pull: { slots: id }
        });

        res.status(200).json({ message: 'Slot deleted successfully.' });
    } catch (err: any) {
        console.error(err);
        res.status(500).send({error: err.message});
    }
}