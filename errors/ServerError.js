module.exports.ServerError = ((err, req, res) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'Internal error has occurred' : message });
});
