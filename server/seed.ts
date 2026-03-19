import mongoose from "mongoose";
import Laboratory from "./models/Laboratory.ts"; 
import Slot from "./models/Slot.ts";
import Reservation from "./models/Reservation.ts";

const MONGO_URI = "mongodb://localhost/labDB"; 

async function seedDatabase() {
    try {
        console.log("Connecting to database...");
        await mongoose.connect(MONGO_URI);
        console.log("Connected!");

        console.log("Nuking old collections...");
        try { await Laboratory.collection.drop(); } catch (e) {}
        try { await Slot.collection.drop(); } catch (e) {}
        try { await Reservation.collection.drop(); } catch (e) {}

        const myUserId = new mongoose.Types.ObjectId("69b845426fa0c10654dbbcbf"); 
        const sections = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        const labNames = ["Gokongwei 307A", "Gokongwei 307B", "Gokongwei 404A"];

        let gokongwei307A_id = null;
        let slotA1_id = null;
        let slotB4_id = null;
        
        for (const labName of labNames) {
            console.log(`Creating ${labName} and building 64 desks...`);
            
            const lab = await Laboratory.create({
                name: labName,
                slots: []
            });

            const slotDocs = [];
            for (const section of sections) {
                for (let i = 1; i <= 8; i++) {
                    const newSlot = await Slot.create({
                        name: `${section}${i}`,
                        laboratory: lab._id
                    });
                    slotDocs.push(newSlot);

                    if (labName === "Gokongwei 307A") {
                        gokongwei307A_id = lab._id;
                        if (newSlot.name === "A1") slotA1_id = newSlot._id;
                        if (newSlot.name === "B4") slotB4_id = newSlot._id;
                    }
                }
            }

            lab.slots = slotDocs.map(slot => slot._id);
            await lab.save();
        }

        console.log("Booking desks A1 and B4 in Gokongwei 307A for Richmond...");
        
        await Reservation.create({
            user: myUserId,
            laboratory: gokongwei307A_id!,
            isReservedByAdmin: false,
            isAnonymous: false,
            status: "active",
            reservedSlots: [
                {
                    slot: slotA1_id!,
                    timeStart: new Date("2026-03-20T07:30:00.000Z"), 
                    timeEnd: new Date("2026-03-20T08:00:00.000Z")
                },
                {
                    slot: slotB4_id!,
                    timeStart: new Date("2026-03-20T07:30:00.000Z"),
                    timeEnd: new Date("2026-03-20T08:00:00.000Z")
                }
            ]
        });

        console.log("🎉 Database Successfully Seeded! All 3 labs and 192 slots are ready.");
        process.exit();

    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
}

seedDatabase();