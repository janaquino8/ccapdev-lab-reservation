import mongoose from "mongoose";

const SlotSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },

        laboratory: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },

        // laboratory: {
        //     type: String,
        //     required: true,
        //     // add enum for all respective labs?
        // },

        reservations: {
            user: {
                fullName: {
                    type: String,
                    required: true
                },

                username: {
                    type: String,
                    required: true
                }
            },

            timeStart: {
                type: Date,
                required: true,
            },

            timeEnd: {
                type: Date,
                required: true,
            },
        },

        timeStart: {
            type: Date,
            required: true,
        },

        timeEnd: {
            type: Date,
            required: true,
        },

    },

    {
        timestamps: true
    }
);

const Slot = mongoose.model("Slot", SlotSchema);

export default Slot;