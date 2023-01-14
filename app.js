const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json);

// parser
app.use(cookieParser());

// protection
app.use(helmet());

// requests logger
app.use(requestLogger);

// routes

// errors logger
app.use(errorLogger);

// errors validation

async function start() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
