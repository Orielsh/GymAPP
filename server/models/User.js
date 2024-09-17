const mongoose = require("mongoose");
const { imageSchema, nameSchema } = require("./common");

const userSchema = new mongoose.Schema(
    {
        name: nameSchema,
        isDeleted: {type: Boolean, default: false, select: false},
        phone: String,
        email: { type: String, unique: true },
        password: String,
        image: imageSchema,
        birthdate: Date,
        gender: String,
        weightKG: Number,
        heightCM: Number,
        plan: {
            plan: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Plan",
            },
            startDate: Date,
        },
        role: {
            type: String,
            required: true,
            enum: ["ADMIN", "TRAINER", "TRAINEE"],
        },
        trainer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        trainees: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                }
            ],
            default: undefined,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;