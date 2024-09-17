const workoutDAL = require('../dal/workout.dal');

async function createWorkout(workout) {
    return await workoutDAL.createWorkout(workout);
}

async function getAllWorkouts() {
    return await workoutDAL.getAllWorkouts();
}

async function getWorkoutById(id) {
    return await workoutDAL.findById(id);
};

async function updateWorkout(id, updates) {
    return await workoutDAL.updateWorkout(id, updates);
};

async function deleteWorkout(id) {
    return await workoutDAL.deleteWorkout(id);
};

async function getExerciseList(workoutId){
    return await workoutDAL.getExerciseList(workoutId);
}

async function removeExercise(workoutId ,exerciseId){
    return await workoutDAL.removeExercise(workoutId ,exerciseId);
}

async function addExercise(workoutId ,exerciseId){
    return await workoutDAL.addExercise(workoutId ,exerciseId);
}

async function softDelete(workoutId){
    return await workoutDAL.softDelete(workoutId);
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
}