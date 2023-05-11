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

exports.addBorrow = addBorrow;
