const router = require('express').Router();
const auth = require("../middlewares/auth");
const workoutController = require("../controllers/workoutController");
const validateScheme = require('../middlewares/JOIValidator');
const workoutSchema = require('../schemas/workoutSchema');

//  base path = "/api/workouts"

router.post("/", auth.isLoggedIn, auth.isAdminOrTrainer, validateScheme(workoutSchema.create), workoutController.createWorkout);
router.get("/exercises/:id", auth.isLoggedIn, workoutController.getExerciseList);
router.patch("/:id", auth.isLoggedIn, validateScheme(workoutSchema.patch),workoutController.updateWorkout);
router.patch("/:workoutId/exercises/add/:exerciseId", auth.isLoggedIn,workoutController.addExercise);
router.get("/", auth.isLoggedIn, workoutController.getAllWorkouts);
router.delete("/:workoutId/exercises/:exerciseId", auth.isLoggedIn,auth.isAdminOrTrainer,  workoutController.removeExercise);
router.delete("/:id", auth.isLoggedIn, auth.isAdminOrTrainer, workoutController.softDeleteWorkout);

module.exports = router