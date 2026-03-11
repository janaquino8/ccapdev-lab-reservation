import mongoose from "mongoose";

const ReservedSlotSchema = new mongoose.Schema(
    {
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
        }
    },

    {
        _id: false
    }
)

const ReservationSchema = new mongoose.Schema(
    {
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
            default: true
        },

        status: {
            type: String,
            enum: ["active", "ongoing", "completed", "cancelled"],
            default: "active" 
        },

        reservedSlots: {
            type: [ReservedSlotSchema],
            required: true
        }
    },

    {
        timestamps: true
    }
);

const Reservation = mongoose.model("Reservation", ReservationSchema);
const ReservedSlot  = mongoose.model("ReservedSlot", ReservedSlotSchema);

export { Reservation, ReservedSlot };