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
      .find(req.query)
      .select({
        __v: false
      })
      .lean()
      .then(memes => res.send(memes))
      .catch(next)
  })
  .get('/:id', (req, res, next) => {
    const { id } = req.params;

    Meme
      .findById(id)
      .select({
        __v: false
      })
      .lean()
      .then(meme => res.send(meme))
      .catch(next)
  });
