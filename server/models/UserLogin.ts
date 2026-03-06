import mongoose from "mongoose";

const UserLoginSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // username: {
        //     type: String,
        //     required: true,
        //     unique: true,
        //     set: (email: String) => email.replace("@dlsu.edu.ph", "")
        // },

        password : {
            type: String,
            required: true
        }

    },

    {
        timestamps: true
    }
)

const UserLogin = mongoose.model("UserLogin", UserLoginSchema);

UserLogin.create({
    username: "admin",
    password: "qoipdgjvaszd"
});

/*
// Example of a pre-save hook to hash the password with bcrypt
userLoginSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    // Use a library like bcrypt to generate a salt and hash the password
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});
*/

export default UserLogin;