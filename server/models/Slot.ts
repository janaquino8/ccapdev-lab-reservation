import mongoose from "mongoose";

const SlotSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        laboratory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Laboratory", 
            required: true
        },
    },
    { timestamps: true }
);

// made it so that the name & lab combo is unique
SlotSchema.index({ name: 1, laboratory: 1 }, { unique: true });

const Slot = mongoose.model("Slot", SlotSchema);
export default Slot;