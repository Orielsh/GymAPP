const router = require('express').Router();
const validateScheme = require('../middlewares/JOIValidator');
const { schemas } = require("../schemas/authSchema");
const validateUniqueEmail = require('../middlewares/validations');
const authController = require("../controllers/authController");

//  base path = "/api/auth"

router.post('/login', validateScheme(schemas.login), authController.login)
router.post("/register", validateScheme(schemas.register), validateUniqueEmail, authController.register);

module.exports = router;