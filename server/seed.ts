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

        console.log("Clearing old data...");
        await Laboratory.deleteMany({});
        await Slot.deleteMany({});
        await Reservation.deleteMany({});

        // Using your exact User ID
        const myUserId = new mongoose.Types.ObjectId("69b845426fa0c10654dbbcbf"); 

        console.log("Creating Gokongwei 307A...");
        const gokongweiLab = await Laboratory.create({
            name: "Gokongwei 307A",
            slots: []
        });

        console.log("Building 64 desks...");
        const sections = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        const slotDocs = [];

        for (const section of sections) {
            for (let i = 1; i <= 8; i++) {
                const newSlot = await Slot.create({
                    name: `${section}${i}`,
                    laboratory: gokongweiLab._id
                });
                slotDocs.push(newSlot);
            }
        }

        gokongweiLab.slots = slotDocs.map(slot => slot._id);
        await gokongweiLab.save();

        console.log("Booking desks A1 and B4 for Richmond...");
        
        const slotA1 = slotDocs.find(s => s.name === "A1");
        const slotB4 = slotDocs.find(s => s.name === "B4");

        await Reservation.create({
            user: myUserId,
            laboratory: gokongweiLab._id,
            isReservedByAdmin: false,
            isAnonymous: false,
            status: "active",
            reservedSlots: [
                {
                    slot: slotA1?._id,
                    // FIXED: Using standard ISO Date formatting so Node.js doesn't crash!
                    timeStart: new Date("2026-03-20T07:30:00.000Z"), 
                    timeEnd: new Date("2026-03-20T08:00:00.000Z")
                },
                {
                    slot: slotB4?._id,
                    timeStart: new Date("2026-03-20T07:30:00.000Z"),
                    timeEnd: new Date("2026-03-20T08:00:00.000Z")
                }
            ]
        });

        console.log("🎉 Database Successfully Seeded! You can now test your frontend.");
        process.exit();

    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
}

seedDatabase();