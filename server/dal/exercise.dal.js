const Exercise = require("../models/Exercise");

// create exercise
async function createExercise(exercise) {
    const newExercise = new Exercise(exercise);
    return await newExercise.save();
};

// get all exercises
async function getAllExercises() {
    return await Exercise.find({isDeleted: false});
};

// get exercise by ID
async function getExerciseById(id) {
    return await Exercise.findById(id);
};

// update exercise by ID
async function updateExercise(updates) {
    //should use exec?
    return await Exercise.findByIdAndUpdate(updates._id, updates, { new: true });
};

// soft delete an exercise by id
async function softDelete(exerciseId){
    return  await Exercise.findByIdAndUpdate(exerciseId, { isDeleted: true });
}

// delete a exercise by ID
async function deleteExercise(id) {
    return await Exercise.findByIdAndDelete(id);
};

module.exports = {
    createExercise,
    getAllExercises,
    getExerciseById,
    updateExercise,
    softDelete,
    deleteExercise,
};