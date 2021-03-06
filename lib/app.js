const express = require('express');
const app = express();
const cors = require('cors');
const mongoConnection = require('./middleware/mongo-connection');

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}))

app.use(express.json());
// connect to routes
app.use(cors());
app.options('/api/vi/memes', cors()) 
app.use('/api/v1/memes', mongoConnection, require('./routes/memes'));
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
