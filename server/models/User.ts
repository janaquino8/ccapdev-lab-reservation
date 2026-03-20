import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        givenName: {
            type: String,
            required: true,
        },

        lastName: {
            type: String, 
            required: true,
        },

        // i included both nlng
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        username: {
            type: String,
            required: true,
            unique: true,
            set: (emailOrUsername: string) => emailOrUsername.replace("@dlsu.edu.ph", "")
        },

        description: {
            type: String,
            default: "I'm a Lasallian reserving a seat in a laboratory!",
        },

        // default is white circle, place pfps in client(?)
        profilePicture: {
            type: String,
            default: ""
        },
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", UserSchema);

export default User;