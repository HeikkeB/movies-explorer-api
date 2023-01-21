const MONGO_URL_DEV = 'mongodb://127.0.0.1:27017/devbitfilmsdb';
const JWT_SECRET_DEV = 'fc940a6da342577ec7ecc725c90a5037';
const BAD_REQUEST_MESSAGE = 'Incorrect data entered';
const CONFLICT_MESSAGE = 'is already in use';
const FORBIDDEN_MESSAGE = 'Cannot be removed';
const NOTFOUND_MESSAGE = 'Not found';
const SERVER_MESSAGE = 'Internal error has occurred';
const UNAUTHORIZE_MESSAGE = 'Authorization required!';

module.exports = {
  MONGO_URL_DEV,
  JWT_SECRET_DEV,
  BAD_REQUEST_MESSAGE,
  CONFLICT_MESSAGE,
  FORBIDDEN_MESSAGE,
  NOTFOUND_MESSAGE,
  SERVER_MESSAGE,
  UNAUTHORIZE_MESSAGE,
};
