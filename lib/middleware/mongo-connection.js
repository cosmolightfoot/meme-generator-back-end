const mongoose = require('mongoose');
const state = require('mongoose/lib/connectionstate');

module.exports = (req, res, next) => {
  let err = null;
  const { readyState } = mongoose.connection;
  if(readyState !== state.connected && readyState !== state.connected) {
    err = new Error('Not Connected to MongoDB');
    err.status = 500;
  }

  next(err);
};
