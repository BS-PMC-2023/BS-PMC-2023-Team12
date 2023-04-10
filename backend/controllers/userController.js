const HttpError = require('../httpError');
//const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const USERS = [
  {
    id: 'u1',
    name: 'test',
    email: 'test@test.com',
    password: 'testers',
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: USERS });
};

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError('ההרשמה נכשלה', 500);
  }

  if (existingUser) {
    const error = new HttpError('משתמש קיים כבר', 422);
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password,
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError('ההרשמה נכשלה, אנא נסה שוב.', 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError('הכניסה נכשלה, אנא נסה שוב מאוחר יותר.', 500);
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError('נתונים לא נכונים, אנא נסה שנית.', 401);
    return next(error);
  }

  res.json({ message: 'Logged in!' });
};

exports.getUsers = getUsers;
exports.register = register;
exports.login = login;
