const router = require('express').Router();
const auth = require("../middlewares/auth");
const planController = require("../controllers/planController");
const validateScheme = require('../middlewares/JOIValidator');
const planSchema = require('../schemas/planSchema');

//  base path = "/api/plans"
router.get("/", auth.isLoggedIn, planController.getAllPlans);
router.post("/", auth.isLoggedIn, auth.isAdminOrTrainer ,validateScheme(planSchema.create), planController.createPlan);
router.patch("/:id", auth.isLoggedIn, auth.isAdminOrTrainer ,validateScheme(planSchema.patch), planController.patchPlan);
router.delete("/:id", auth.isLoggedIn, auth.isAdminOrTrainer, planController.softDeletePlan);

module.exports = router;