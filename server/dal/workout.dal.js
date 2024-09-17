const Workout = require("../models/Workout");
const mongoose = require('mongoose');

async function createWorkout(workout) {
    const newWorkout = new Workout(workout);
    return await newWorkout.save();
};

async function getAllWorkouts() {
    return await Workout.find({isDeleted: false});
};

async function getWorkoutById(id) {
    return await Workout.findById(id);
};

async function updateWorkout(id, updates) {
    return await Workout.findByIdAndUpdate(id, updates, { new: true });
};

async function deleteWorkout(id) {
    return await Workout.findByIdAndDelete(id);
};

async function getExerciseList(workoutId) {

    return await Workout.aggregate([
        {
            $match: { _id: mongoose.Types.ObjectId.createFromHexString(workoutId) }
        },
        {
            $unwind: "$exercises"
        },
        {
            $lookup: {
                from: "exercises",
                localField: "exercises.exercise",
                foreignField: "_id",
                as: "exerciseDetails"
            }
        },
        {
            $unwind: "$exerciseDetails"
        },
        {
            $project: {
                _id: 0,
                exercise: {
                    $mergeObjects: [
                        "$exerciseDetails",
                        "$exercises.modifications"
                    ]
                }
            }
        }, {
            $replaceRoot: { newRoot: "$exercise" }
        }
    ])
        .exec();
}


async function removeExercise(workoutId, exerciseId) {
    if ((await getExerciseList(workoutId)).length < 2)
        throw ("Can't remove exercise because this workout have only 1 exercise and it can't be exist without exercises")
    return await Workout.findByIdAndUpdate(
        workoutId,
        { $pull: { exercises: { exercise: exerciseId } } },
        { new: true }
    )
}

async function addExercise(workoutId, exerciseId) {
    return await Workout.findByIdAndUpdate(
        workoutId,
        { $push: { exercises: { exercise: exerciseId } } },
        { new: true }
    )
}

// soft delete an wrokout by id
async function softDelete(workoutId) {
    return await Workout.findByIdAndUpdate(workoutId, { isDeleted: true });
}

module.exports = {
    createWorkout,
    getAllWorkouts,
    getWorkoutById,
    updateWorkout,
    deleteWorkout,
    getExerciseList,
    removeExercise,
    addExercise,
    softDelete,
};