const { Router } = require('express');
const Meme = require('../models/Meme');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      imageUrl,
      topText,
      bottomText
    } = req.body;

    Meme 
      .create({ name, imageUrl, topText, bottomText })
      .then(meme => res.send(meme))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Meme
      .find()
      .select({
        __v: false
      })
      .lean()
      .then(memes => res.send(memes))
      .catch(next)
  });
