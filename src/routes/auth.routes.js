const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { registerRules, loginRules } = require('../validators/auth.validator');
const { validate } = require('../validators/user.validator');
const { protect, authorize } = require('../middlewares/auth');

router.post('/register', registerRules, validate, authController.register);
router.post('/login', loginRules, validate, authController.login);

//ruta temporal para crear admin (protegida)
router.post('/register-admin', registerRules, validate, authController.registerAdmin);

module.exports = router;