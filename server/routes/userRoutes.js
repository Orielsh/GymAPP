const router = require('express').Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");
const userSchema = require('../schemas/userSchema');
const validateScheme = require('../middlewares/JOIValidator');

//  base path = "/api/users"

router.get("/trainers-list", auth.isLoggedIn, userController.getTrainersList);
router.get("/trainer/:id", auth.isLoggedIn, userController.getTrainerById);
router.get("/:id", auth.isLoggedIn, auth.canViewAllUsers, userController.getUserById);
router.patch("/:id", auth.isLoggedIn, auth.isCurrentUser, validateScheme(userSchema.patch), userController.updateUser);
router.patch("/:id/trainer", auth.isLoggedIn, auth.isAdminOrTrainer, validateScheme(userSchema.setTrainer), userController.updateUser);
router.patch("/:id/plan", auth.isLoggedIn, auth.isAdminOrTrainer, validateScheme(userSchema.setPlan), userController.updateUser);
router.patch("/:id/role", auth.isLoggedIn, auth.isAdmin, validateScheme(userSchema.changeRole), userController.updateUser);
router.get("/", auth.isLoggedIn, auth.isAdminOrTrainer, userController.getAllUsers);
router.delete("/:id", auth.isLoggedIn, auth.isAdmin, userController.softDeleteUser);

module.exports = router