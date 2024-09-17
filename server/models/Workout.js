const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
    {
        name: String,
        isDeleted: {type: Boolean, default: false, select: false},
        exercises: {
            type: [
                {
                    exercise: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Exercise",
                        required: true,
                    },
                    modifications: {
                        sets: Number,
                        repetitions: Number,
                        weight: Number,
                        duration: Number,
                    }
                }
            ],
            _id: false,
            required: false,
            // validate: [exArr => Array.isArray(exArr) && exArr.length > 0, "Wokrout must include at least one exercise"],
            default: undefined,
        },
    },
    {
        timestamps: true,
    }
);

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;