import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            MINLENGTH: 1,
            MAXLENGTH: 30
        },
        password: {
            type: String,
            required: true,
            MINLENGTH: 5,
            MAXLENGTH: 50
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        }
    },
    { timestamps: true }
)

export const User = mongoose.model("User", userSchema);
