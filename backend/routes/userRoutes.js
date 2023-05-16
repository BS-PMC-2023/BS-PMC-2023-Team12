const express = require('express');

const usersController = require('../controllers/userController');

const router = express.Router();

router.get('/', usersController.getUsers);
router.delete('/:id', usersController.deleteUser);
router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.post('/forgot-password', usersController.forogotPassword);
router.get('/reset-password/:id/:token', usersController.resetPassword);
router.post('/reset-password/:id/:token', usersController.changePassword);
<<<<<<< HEAD
router.get('/personalZone/:id', usersController.updateUserProfile);
=======
router
  .get('/personalZone', usersController.updateUserProfile)
  .put(usersController.updateUserProfile);
>>>>>>> 70e2e524fba843ae30120ee92fdc858d729450fe
router.put('/updateAdmin/:id', usersController.updateAdmin);

module.exports = router;
