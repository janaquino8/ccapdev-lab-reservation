import mongoose from "mongoose";

const connect_db = async function() {
    try {
        const dbURI = process.env.MONGO_URI || "mongodb://localhost/labDB";

        if (!process.env.MONGO_URI) {
            console.warn("MONGO_URI is missing. Falling back to localhost.");
        }
        await mongoose.connect(dbURI);
        console.log("Connected to Database :)");
        
    } catch (error) {
        console.error("MongoDB Connection Failed:");
        console.error(error);
    }
};

export default connect_db;