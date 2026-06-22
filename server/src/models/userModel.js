import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
            required: true,
            maxlength: 50,
        },

        lastName: {
            type: String,
            trim: true,
            maxlength: 50,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        mobileNumber: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        isMobileVerified: {
            type: Boolean,
            default: false
        },

        authProvider: {
            type: String,
            enum: ["local", "google"],
            default: "local"
        },

        providerId: {
            type: String,
            default: null,
        },
        password: {
            type: String,
            required: function () {
                return this.authProvider === "local";
            },
            select: false,
        },

        role: {
            type: String,
            enum: ["user", "admin", "super-admin"],
            default: "user",
        },

        isEmailVerified: {
            type: Boolean,
            default: false,
        },

        status: {
            type: String,
            enum: ["active", "inactive", "suspended", "deleted"],
            default: "active",
        },

        lastLoginAt: Date,

        loginAttempts: {
            type: Number,
            default: 0,
        },

        tokenVersion: {    //This allows "logout all devices".
            type: Number,
            default: 0
        },

        lockUntil: Date,

        avatar: String,
    },

    {
        timestamps: true,
        versionKey: false,
    }
);

export const User = mongoose.model("User", userSchema);