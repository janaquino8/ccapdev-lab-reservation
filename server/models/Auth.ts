import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            set: (email: String) => email.replace("@dlsu.edu.ph", "")
        },

        password: {
            type: String,
            required: true
        }

    },

    {
        timestamps: true
    }
)

// maybe move auth to user and manually create admin in mongodb compass
const Auth = mongoose.model("Auth", AuthSchema);

// Example of a pre-save hook to hash the password with bcrypt
// AuthSchema.pre('save', function(next) {
//     const user = this;
//     if (!user.isModified('password')) return next();

//     // Use a library like bcrypt to generate a salt and hash the password
//     bcrypt.genSalt(10, function(err, salt) {
//         if (err) return next(err);
//         bcrypt.hash(user.password, salt, function(err, hash) {
//             if (err) return next(err);
//             user.password = hash;
//             next();
//         });
//     });
// });


export default Auth;