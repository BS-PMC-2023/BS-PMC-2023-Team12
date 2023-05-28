const Borrow = require('../models/borrowModel');

const addBorrow = async (req, res) => {
  const { user, name, email, borrowDate, returnDate } = req.body;

  const createdBorrow = new Borrow({
    user: user,
    name,
    email,
    borrowDate,
    returnDate,
  });

  try {
    await createdBorrow.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError('שגיאה ביצירת ההשאלה', 500);
    return next(error);
  }

  res.status(201).json(createdBorrow);
};

//get user borrows items
const getUserBorrows = async (req, res, next) => {
  try {
    const { user: reqUser, name, email, isAvailable, userID } = req.body;
    const userItems = await User.findOne({ userID: userID });
    if (!userItems) {
      const error = new HttpError('איו השאלות פעילות', 401);
      return next(error);
    } else {
      res.json({
        user: reqUser,
        name,
        email,
        isAvailable,
        userID,
      });
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.addBorrow = addBorrow;
exports.getUserBorrows = getUserBorrows;
