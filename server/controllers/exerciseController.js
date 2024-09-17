const exerciseService = require("../services/exerciseService");

const getAllExercises = async (req, res) => {
  try {
    const exerciseList = await exerciseService.getAllExercises();
    // found
    if (exerciseList) {
      // return the user found
      return res.status(200).json({
        success: true,
        data: exerciseList,
      });
    }
    // not found
    return res.status(500).json({
      success: false,
      message: `Conuldn't fetch exercise list`,
    });
  } catch (err) {
    // return an error message
    return res.status(err.status || 500).json({
      success: false,
      message: err.message ?? "Conuldn't fetch exercise list",
    });
  }
};

const createExercise = async (req, res) => {
  try {
    const newExercise = await exerciseService.createExercise(req.synthBody);
    return res.status(200).json({
      success: true,
      data: newExercise,
    });
  }
  catch (err) {
    // return an error message
    return res.status(err.status || 500).json({
      success: false,
      message: err.message ?? "Conuldn't create exercise",
    });
  }
};

const updateExercise = async (req, res) => {
  try {
    const updated = await exerciseService.updateExercise(req.synthBody);
    return res.status(200).json({
      success: true,
      data: updated,
    });
  }
  catch (err) {
    // return an error message
    return res.status(err.status || 500).json({
      success: false,
      message: err.message ?? "Conuldn't update exercise",
    });
  }
};

const softDeleteExercise = async (req, res) => {
  try {
    const idToDelete = req.params.id;
    const deleted = await exerciseService.softDelete(idToDelete);
    return res.status(200).json({
      success: true,
      data: deleted,
    });
  }
  catch (err) {
    // return an error message
    return res.status(err.status || 500).json({
      success: false,
      message: err.message ?? "Conuldn't delete exercise",
    });
  }
};

module.exports = {
  getAllExercises,
  createExercise,
  updateExercise,
  softDeleteExercise,
}