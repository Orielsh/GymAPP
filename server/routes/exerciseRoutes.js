const router = require('express').Router();
const auth = require("../middlewares/auth");
const exerciseController = require("../controllers/exerciseController");
const validateScheme = require('../middlewares/JOIValidator');
const { exerciseSchema } = require("../schemas/exerciseSchema");

//  base path = "/api/exercises"

router.get("/", auth.isLoggedIn, exerciseController.getAllExercises);
router.post("/", auth.isLoggedIn, auth.isAdminOrTrainer, validateScheme(exerciseSchema.create), exerciseController.createExercise);
router.put("/", auth.isLoggedIn, auth.isAdminOrTrainer, validateScheme(exerciseSchema.put), exerciseController.updateExercise);
router.delete("/:id", auth.isLoggedIn, auth.isAdminOrTrainer, validateScheme(exerciseSchema.delete), exerciseController.softDeleteExercise);

module.exports = router