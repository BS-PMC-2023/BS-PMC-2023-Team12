const HttpError = require('../httpError');
const Borrow = require('../models/borrowModel');

const addBorrow = async (req, res) => {
  const { userID, equipmentID, name, email, borrowDate, returnDate } = req.body;

  const createdBorrow = new Borrow({
    userID,
    equipmentID,
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

const getBorrow = async (req, res, next) => {
  let borrows;
  try {
    borrows = await Borrow.find({});
  } catch (err) {
    const error = new HttpError(
      'Fetching borrows failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({
    borrows: borrows.map((borrow) => borrow.toObject({ getters: true })),
  });
};

const updateAvalibale = async (req, res, next) => {
  const { id } = req.params;

  try {
    const borrow = await Borrow.findOne({ _id: id });
    borrow.isAvailable = !borrow.isAvailable;
    const UpdateBorrow = await borrow.save();

    res.json({
      isAvailable: UpdateBorrow.isAvailable,
    });
  } catch (err) {
    return next(err);
  }
};

exports.addBorrow = addBorrow;
exports.getBorrow = getBorrow;
exports.updateAvalibale = updateAvalibale;
