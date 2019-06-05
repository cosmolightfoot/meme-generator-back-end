const express = require('express');
const app = express();


// connect to middleware
app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}))

app.use(express.json());

// connect to routes

module.exports = app;
