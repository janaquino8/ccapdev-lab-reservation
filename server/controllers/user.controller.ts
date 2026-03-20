import User from '../models/User.ts';
import Reservation from '../models/Reservation.ts';
import { Request, Response } from "express";

export async function createUser(req: Request, res: Response) {
    try {
        const user = await User.create(req.body);
        res.status(201).send(user);
    } catch (err: any) {
        console.error(err);
        res.status(500).send({error: err.message});
    }
}

export async function getAllUsers(req: Request, res: Response) {
    try {
        const user = await User.find({});
        res.status(200).send(user);
    } catch (err: any) {
        console.error(err);
        res.status(500).send({error: err.message});
    }
}

export async function getUserById(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).send(user);
    } catch (err: any) {
        console.error(err);
        res.status(500).send({error: err.message});
    }
}

export async function getUserByName(req: Request, res: Response) {
    try {
        const search = req.query.search as string;
        const user = await User.find({ 
            $or: [ 
                { givenName: { $regex: search, $options: "i" } }, 
                { lastName: { $regex: search, $options: "i" } }, 
                { username: { $regex: search, $options: "i" } }
            ]  
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).send(user);
    } catch (err: any) {
        console.error(err);
        res.status(500).send({error: err.message});
    }
}

export async function getUserReservations(req: Request, res: Response) {
    try {
        const user = req.params.id;

        const reservations = await Reservation.find({
            user: user
        }).populate('user', 'givenName lastName username')
            .populate('laboratory', 'name')
            .populate('reservedSlots.slot', 'name');

        if (reservations.length === 0) {
            return res.status(404).send({ message: "User has no reservations" });
        }
        res.status(200).send(reservations);
    } catch (err: any) {
        console.error(err);
        res.status(500).send({ error: err.message })
    }
}

export async function updateUser(req: Request, res: Response) {
    try {
        const id = req.params.id;

		if (Object.keys(req.body).length === 0) {
			return res.status(400).json({ message: 'No update fields provided.' });
		}

        const user = await User.findByIdAndUpdate(id, req.body, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).send(user);
    } catch (err: any) {
        console.error(err);
        res.status(500).send({error: err.message});
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const deletedUser = await User.findByIdAndDelete(id);

        if (deletedUser === null) {
            return res.status(404).json({ message: 'User not found.' });
        }

        await Reservation.updateMany(
            { user: deletedUser._id, status: { $in: [ "active", "ongoing" ] } },
            {
                $set: { status: "cancelled" },
                $currentDate: { lastModified: true }
            }
        )

        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (err: any) {
        console.error(err);
        res.status(500).send({error: err.message});
    }
}