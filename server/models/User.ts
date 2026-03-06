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

        // we can use this for the url; comes from the email
        username: {
            type: String,
            required: true,
            unique: true,
            set: (email: String) => email.replace("@dlsu.edu.ph", "")
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

        // reservations: {
        //     laboratory: {
        //         type: String,
        //         required: true,
        //     },

        //     slot: {
        //         type: String,
        //         required: true,
        //     },

        //     timeStart: {
        //         type: Date,
        //         required: true,
        //     },

        //     timeEnd: {
        //         type: Date,
        //         required: true,
        //     },
        // }


    },

    {
        timestamps: true
    }
)

const User = mongoose.model("User", UserSchema);

export default User;