const workoutService = require("../services/workoutService");

const getExerciseList = async (req, res) => {

    const { id } = req.params;
    try {
      const exerciseList = await workoutService.getExerciseList(id);
      // found
      if (exerciseList) {
        // return the user found
        return res.status(200).json({
          success: true,
          data: exerciseList,
        });
      }
      // not found
      return res.status(404).json({
        success: false,
        message: `workout with id: '${id}' not found`,
      });
    } catch (err) {
      // return an error message
      return res.status(err.status || 400).json({
        success: false,
        message: "Invalid format for workout id or access denied",
      });
    }
  };

  const getAllWorkouts = async (req, res) => {
    try {
      const allWorkouts = await workoutService.getAllWorkouts();
      return res.status(200).json({
        success: true,
        data: allWorkouts,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Failed fetch workouts list",
      });
    }
  };

  const removeExercise = async (req, res) => {
    try {
      const { workoutId, exerciseId } = req.params;
      const workoutAfterChange = await workoutService.removeExercise(workoutId, exerciseId);
      return res.status(200).json({
        success: true,
        data: workoutAfterChange,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to remove exercise from workouts exercises list",
      });
    }
  };

  const updateWorkout = async (req, res) =>{
    try {
      const { id } = req.params;
      const updatedWorkout = await workoutService.updateWorkout(id, req.synthBody);
      return res.status(200).json({
        success: true,
        data: updatedWorkout,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to update workout",
      });
    }
  }

  const addExercise = async (req, res) =>{
    try {
      const { workoutId, exerciseId } = req.params;
      const updatedWorkout = await workoutService.addExercise(workoutId, exerciseId);
      return res.status(200).json({
        success: true,
        data: updatedWorkout,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to add exercise",
      });
    }
  }

  const softDeleteWorkout = async (req, res) => {
    try {
      const id = req.params.id;
      const deleted = await workoutService.softDelete(id);
      return res.status(200).json({
        success: true,
        data: deleted,
      });
    }
    catch (err) {
      // return an error message
      return res.status(err.status || 500).json({
        success: false,
        message: err.message ?? "Conuldn't delete workout",
      });
    }
  };

  const createWorkout = async (req, res) => {
    try {
      const newWorkout = await workoutService.createWorkout(req.synthBody);
      return res.status(200).json({
        success: true,
        data: newWorkout,
      });
    }
    catch (err) {
      // return an error message
      return res.status(err.status || 500).json({
        success: false,
        message: err.message ?? "Conuldn't create workout",
      });
    }
  };

  module.exports = {
    getExerciseList,
    getAllWorkouts,
    removeExercise,
    updateWorkout,
    addExercise,
    softDeleteWorkout,
    createWorkout,
  }