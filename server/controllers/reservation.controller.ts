import { Request, Response } from "express";
import Laboratory from '../models/Laboratory.ts';
import Slot from '../models/Slot.ts';
import Reservation from '../models/Reservation.ts';

export async function getFilteredReservations(req: Request, res: Response) {
    try {
        const { laboratory, date, time } = req.body;

        const labDoc = await Laboratory.findOne({ name: laboratory });
        
        if (!labDoc) {
            return res.status(404).json({ message: 'Laboratory not found.' });
        }

        const convertToUTC = (dateString: string, timeString: string) => {
            const [timePart, modifier] = timeString.split(' ');
            let [hours, minutes] = timePart.split(':');
            
            let hoursInt = parseInt(hours, 10);
            if (modifier === 'PM' && hoursInt < 12) hoursInt += 12;
            if (modifier === 'AM' && hoursInt === 12) hoursInt = 0;
            
            const paddedHours = hoursInt.toString().padStart(2, '0');
            return new Date(`${dateString}T${paddedHours}:${minutes}:00.000Z`);
        };

        const [startTimeStr, endTimeStr] = time.split(' - '); 

        const searchStartTime = convertToUTC(date, startTimeStr);
        const searchEndTime = convertToUTC(date, endTimeStr);

        const reservations = await Reservation.find({
            laboratory: labDoc._id,
            "reservedSlots.timeStart": { $lt: searchEndTime },
            "reservedSlots.timeEnd": { $gt: searchStartTime }
        }).populate('user', 'givenName lastName username')
            .populate('laboratory', 'name')
            .populate('reservedSlots.slot', 'name'); 

        if (!reservations || reservations.length === 0) {
            return res.status(404).json({ message: 'No reservations found.' });
        }

        const formattedResults = reservations.flatMap(res => 
            res.reservedSlots.map((rs: any) => {
                const populatedUser = res.user as any;

                const firstName = populatedUser?.givenName || "Unknown";
                const lastName = populatedUser?.lastName || "User";

                return { 
                    slot: rs.slot.name,
                    reserverName: res.isAnonymous ? "Anonymous" : `${firstName} ${lastName}`,
                    reserverUserName: res.isAnonymous ? "" : populatedUser?.username,
                };
            })
        );

        res.status(200).send(formattedResults);
    } catch (err: any) {
        console.error(err);
        res.status(500).send({error: err.message});
    }
}

export async function createReservation(req: Request, res: Response) {
    try {
        const { user, laboratory, isReservedByAdmin, isAnonymous, status, reservedSlots } = req.body;

        const labDoc = await Laboratory.findOne({ name: laboratory });
        if (!labDoc) {
            return res.status(404).json({ message: 'Laboratory not found.' });
        }

        const translatedSlots = await Promise.all(reservedSlots.map(async (rs: any) => {
            const slotDoc = await Slot.findOne({ 
                name: rs.slot, 
                laboratory: labDoc._id
            });

            if (!slotDoc) {
                throw new Error(`Slot ${rs.slot} not found in this laboratory.`);
            }

            return {
                slot: slotDoc._id,
                timeStart: new Date(rs.timeStart),
                timeEnd: new Date(rs.timeEnd)
            };
        }));

        const newReservation = {
            user: user,
            laboratory: labDoc._id,
            isReservedByAdmin: isReservedByAdmin ?? false,
            isAnonymous: isAnonymous ?? false,
            status: status || 'active',
            reservedSlots: translatedSlots
        };

        const reservation = await Reservation.create(newReservation);
        res.status(201).send(reservation);

    } catch (err: any) {
        console.error(err);
        res.status(400).send({error: err.message}); 
    }
}

export async function getAllReservations(req: Request, res: Response) {
    try {
        const reservations = await Reservation.find({})
            .populate('user', 'givenName lastName username')
            .populate('laboratory', 'name')
            .populate('reservedSlots.slot', 'name'); 

        res.status(200).send(reservations);
    } catch (err: any) {
        console.error(err);
        res.status(500).send({error: err.message});
    }
}

export async function getReservationById(req: Request, res: Response) {
    try {
        const id = req.params.id;
        
        const reservation = await Reservation.findById(id)
            .populate('user', 'givenName lastName username')
            .populate('laboratory', 'name')
            .populate('reservedSlots.slot', 'name');

        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found.' });
        }
        
        res.status(200).send(reservation);
    } catch (err: any) {
        console.error(err);
        res.status(500).send({error: err.message});
    }
}

export async function updateReservation(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const updateData = { ...req.body };

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'No update fields provided.' });
        }

        if (updateData.laboratory || updateData.reservedSlots) {

            const existingRes = await Reservation.findById(id);
            if (!existingRes) {
                return res.status(404).json({ message: 'Reservation not found.' });
            }

            let currentLabId = existingRes.laboratory;

            if (updateData.laboratory) {
                const labDoc = await Laboratory.findOne({ name: updateData.laboratory });
                if (!labDoc) {
                    return res.status(404).json({ message: 'Laboratory not found.' });
                }
                currentLabId = labDoc._id;
                updateData.laboratory = labDoc._id;
            }

            if (updateData.reservedSlots) {
                const translatedSlots = await Promise.all(updateData.reservedSlots.map(async (rs: any) => {
                    const slotDoc = await Slot.findOne({ 
                        name: rs.slot, 
                        laboratory: currentLabId
                    });

                    if (!slotDoc) {
                        throw new Error(`Slot ${rs.slot} not found in this laboratory.`);
                    }

                    return {
                        slot: slotDoc._id,
                        timeStart: new Date(rs.timeStart),
                        timeEnd: new Date(rs.timeEnd)
                    };
                }));
                
                updateData.reservedSlots = translatedSlots;
            }
        }

        const updatedReservation = await Reservation.findByIdAndUpdate(id, updateData, { new: true })
            .populate('user', 'givenName lastName username')
            .populate('laboratory', 'name')
            .populate('reservedSlots.slot', 'name');

        if (!updatedReservation) {
            return res.status(404).json({ message: 'Reservation not found.' });
        }
        
        res.status(200).send(updatedReservation);

    } catch (err: any) {
        console.error(err);
        res.status(400).send({ error: err.message });
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