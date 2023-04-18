const User = require('../models/userModel');
//const cameraR = require('../routes/cameraR');
const express = require('express');
const bodyParser = require('body-parser');

const usersController = require('../controllers/userController');

const router = express.Router();

const app = express();


router.get('/', usersController.getUsers);
router.post('/register', usersController.register);
router.post('/login', usersController.login);
//app.use("/camera", cameraR);

module.exports = router;
