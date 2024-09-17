const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
    {
        name: String,
        isDeleted: {type: Boolean, default: false, select: false},
        description: String,
        durationWEEKS: Number,
        workouts: {
            type: [
                {
                    workout: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Workout",
                        required: true,
                    },
                    day: Number,
                    name: String,
                }
            ],
            _id: false,
            required: true,
            validate: [exArr => Array.isArray(exArr) && exArr.length > 0, "Plan must include at least one workout"],
            default: undefined,
        },
    },
    {
        timestamps: true,
    }
);

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;