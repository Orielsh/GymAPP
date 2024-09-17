const exerciseDAL = require('../dal/exercise.dal');

async function createExercise(exercise) {
    return await exerciseDAL.createExercise(exercise);
}

async function getAllExercises() {
    return await exerciseDAL.getAllExercises();
}

async function getExerciseById(id) {
    return await exerciseDAL.findById(id);
};

async function updateExercise(updates) {
    return await exerciseDAL.updateExercise(updates);
};

async function softDelete(exerciseId){
    return await exerciseDAL.softDelete(exerciseId);
}

async function deleteExercise(id) {
    return await exerciseDAL.deleteExercise(id);
};

module.exports = {
    createExercise,
    getAllExercises,
    getExerciseById,
    updateExercise,
    softDelete,
    deleteExercise,
}