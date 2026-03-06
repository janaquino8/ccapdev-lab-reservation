import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema(
    {
        // user: {
        //     fullName: {
        //         type: String,
        //         required: true
        //     },

        //     username: {
        //         type: String,
        //         required: true
        //     }
        // },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        isReservedByAdmin: {
            type: Boolean,
            default: false
        },

        isAnonymous: {
            type: Boolean,
            default: false
        },

        // laboratory: {
        //     type: String,
        //     required: true,
        //     // add enum for all respective labs?
        // },

        laboratory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Laboratory",
            required: true
        },

        // slot: {
        //     type: String,
        //     required: true,
        //     // maybe a function that checks if slot is in lab
        // },

        reservedSlots: {
            type: [{
                slot: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Slot",
                    required: true
                },

                timeStart: {
                    type: Date,
                    required: true,
                },

                timeEnd: {
                    type: Date,
                    required: true,
                },

            }],
            required: true
        }
    },

    {
        timestamps: true
    }
);

const Reservation = mongoose.model("Reservation", ReservationSchema);

export default Reservation;