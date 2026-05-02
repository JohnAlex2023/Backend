const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const { protect, authorize } = require('../middlewares/auth');
const {
  createUserRules,
  updateUserRules,
  validate,
} = require('../validators/user.validator');

// Todas las rutas de aquí abajo requieren token válido
router.use(protect);

router.route('/')
  .get(userController.getAll)
  .post(createUserRules, validate, userController.create);

router.route('/:id')
  .get(userController.getById)
  .put(updateUserRules, validate, userController.update)
  .delete(authorize('admin'), userController.remove);

module.exports = router;