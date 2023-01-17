/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const { ServerError } = require('./errors/ServerError');
const { limiter } = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const { MONGO_URL_DEV } = require('./utils/constants');

const { PORT = 3000 } = process.env;
const { MONGO_URL, NODE_ENV } = process.env;

const app = express();
app.use(express.json());

// parser
app.use(cookieParser());
app.use(bodyParser.json());

// protection
app.use(helmet());
app.use(limiter);

// requests logger
app.use(requestLogger);

// routes
app.use(router);

// errors logger
app.use(errorLogger);

// errors validation
app.use(errors());
app.use(ServerError);

async function start() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : MONGO_URL_DEV);

    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
