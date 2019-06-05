const mongoose = require('mongoose');
const { parse } = require('url');

const mongooseEvent = (event, dbUri) => {
  mongoose.connection.on(event, () => {
    console.log(`Connection to MongoDb ${event} at  ${dbUri}`);
  });
};

const redact = dbUri => {
  const parsedUri = parse(dbUri);
  const authPart = parsedUri.auth ? '***:***@' : '';
  return `${parsedUri.protocol}//${authPart}${parsedUri.hostname}:${parsedUri.port}${parsedUri.pathname}`;
};

module.exports = (dbUri = process.env.MONGODB_URI) => {
  const redactedDbUri = redact(dbUri);
  [
    'open',
    'error',
    'close',
    'disconnected',
    'reconnected'
  ].forEach(event => mongooseEvent(event, redactedDbUri));

  return mongoose.connect(dbUri, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true
  });
};
