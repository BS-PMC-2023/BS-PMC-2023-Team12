const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(
      PORT,
      console.log(
        `\nServer Running In ${process.env.NODE_ENV} Mode On Port ${PORT}`
      )
    );
    console.log(`MongoDB Connected\n`);
  })
  .catch((err) => {
    console.log(err);
  });
