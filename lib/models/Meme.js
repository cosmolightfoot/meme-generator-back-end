const mongoose = require('mongoose');

const memeSchema = mongoose.Schema({
  name: {
    required: true,
    minlength: 1,
    type: String
  },
  imageUrl: {
    required: true,
    type: String
  },
  topText: {
    required: true,
    minlength: 1,
    maxlength: 100,
    type: String
  },
  bottomText: {
    required: true,
    minlength: 1,
    maxlength: 100,
    type: String
  }
});

module.exports = mongoose.model('Meme', memeSchema);
