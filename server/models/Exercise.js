const mongoose = require("mongoose");
const { imageSchema } = require("./common");

const exerciseSchema = new mongoose.Schema(
    {
        name: String,
        sets: Number,
        repetitions: Number,
        weight: Number,
        //durarion in seconds for static exercises such plank.
        duration: Number,
        isDeleted: {type: Boolean, default: false, select: false},
        image: imageSchema,
    },
    {
        timestamps: true,
    }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;