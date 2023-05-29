const HttpError = require('../httpError');
const Borrow = require('../models/borrowModel');
var nodemailer = require('nodemailer');
const cron = require('node-cron');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wmsvcteam12@gmail.com',
    pass: 'kfgyejkhdbbvzmfm',
  },
});

function sendEmail() {
  let currentDate = new Date();

  const cureent = currentDate;
  const fyyyy = cureent.getFullYear();
  let fmm = cureent.getMonth() + 1;
  let fdd = cureent.getDate();

  if (fdd < 10) fdd = '0' + fdd;
  if (fmm < 10) fmm = '0' + fmm;

  const formattedcurrentDate = fdd + '/' + fmm + '/' + fyyyy;
  currentDate = formattedcurrentDate;

  Borrow.find({ returnDate: { $lte: currentDate }, isAvailable: false })
    .then((borrows) => {
      borrows.forEach((borrow) => {
        if (currentDate >= borrow.returnDate) {
          const borrowerMailOptions = {
            from: 'wmsvcteam12@gmail.com',
            to: borrow.email,
            subject: 'תזכורת להחזרת ציוד',
            text: generateBorrowerEmailText(borrow),
          };

          const managerMailOptions = {
            from: 'wmsvcteam12@gmail.com',
            to: 'admin@ac.sce.ac.il', // Replace with the manager's email address
            subject: `תזכורת להחזרת ציוד - לקוח: ${borrow.name}, מק"ט: ${borrow.equipmentID}`,
            text: generateManagerEmailText(borrow),
          };

          transporter.sendMail(borrowerMailOptions, (error, info) => {
            if (error) {
              console.error(error);
            } else {
              console.log(`Borrower Email sent: ${info.response}`);
            }
          });

          transporter.sendMail(managerMailOptions, (error, info) => {
            if (error) {
              console.error(error);
            } else {
              console.log(`Manager Email sent: ${info.response}`);
            }
          });
        }
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

function generateBorrowerEmailText(borrow) {
  let emailText = `,שלום יקר/ה משתמש/ת\n\n`;
  emailText += `.רצינו להזכירך כי עליך להחזיר את הציוד שהשאלתה מספר מק"ט: ${borrow.equipmentID}\n`;
  emailText += `.תאריך החזרה נקבע ל-${borrow.returnDate}\n`;
  emailText += `.אנא וודא כי מבצעים את ההחזרה בזמן כדי שנוכל לשרת גם את המשתמשים האחרים\n\n`;
  emailText += `,תודה רבה ובכבוד רב`;
  emailText += `\n\n SCEWMS צוות`;
  return emailText;
}

function generateManagerEmailText(borrow) {
  const subject = `תזכורת להחזרת ציוד - לקוח: ${borrow.name}, מק"ט: ${borrow.equipmentID}`;
  return subject;
}

// Schedule sendEmail to run every day at 10 AM
cron.schedule('0 10 * * *', () => {
  sendEmail();
});

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
