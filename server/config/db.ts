import mongoose from "mongoose";

const connect_db = async function() {
    try {
        // localhost for now, create a .env in the future?
        await mongoose.connect("mongodb://localhost/labDB");
        console.log("Connected to database.");
    } catch (error) {
        console.log("Error when connecting to database");
    }
};

export default connect_db;