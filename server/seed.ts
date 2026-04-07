import mongoose from "mongoose";
import Laboratory from "./models/Laboratory.js"; 
import Slot from "./models/Slot.js";

const MONGO_URI = "mongodb+srv://dlsulabsadmin_db_user:dlsulabsadmin1234@dlsulabs.bjnf7v8.mongodb.net/?appName=DLSULabs"; 

async function seedDatabase() {
    try {
        console.log("Connecting to database...");
        await mongoose.connect(MONGO_URI);
        console.log("✅ Connected!");

        console.log("Nuking old collections...");
        try { await Laboratory.collection.drop(); } catch (e) {}
        try { await Slot.collection.drop(); } catch (e) {}

        const sections = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        const labNames = ["Gokongwei 301", "Gokongwei 302", "Gokongwei 307A", "Gokongwei 307B", "Gokongwei 404A"];
        
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
                }
            }

            lab.slots = slotDocs.map(slot => slot._id);
            await lab.save();
        }

        console.log("🎉 Database Successfully Seeded! All 5 labs and 320 slots are ready.");
        process.exit();

    } catch (error) {
        console.error("❌ Error seeding database:");
        console.error(error);
        process.exit(1);
    }
}

seedDatabase();
