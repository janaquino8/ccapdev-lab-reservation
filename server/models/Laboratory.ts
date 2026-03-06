import mongoose from "mongoose";

const LaboratorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },

        slots: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Slot"
        }]
    },

    {
        timestamps: true
    }
);

const Laboratory = mongoose.model("Laboratory", LaboratorySchema);

export default Laboratory;