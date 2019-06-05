const Meme = require('../../lib/models/Meme');
const mongoose = require('mongoose')

describe('unit tests for Meme schema', () => {
  it('has a name, top text, bottom text', () => {
    const meme = new Meme({
      name: 'Cosmo',
      imageUrl: 'http://www.google.com',
      topText: 'is on top',
      bottomText: 'is on bottom'
    });

    expect(meme.toJSON()).toEqual({
      name: 'Cosmo',
      imageUrl: 'http://www.google.com',
      topText: 'is on top',
      bottomText: 'is on bottom',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has a required imageUrl field', () => {
    const meme = new Meme({
      name: 'Cosmo',
      topText: 'on top',
      bottomText: 'on bottom'
    });

    const errors = meme.validateSync().errors;

    expect(errors.imageUrl.message).toEqual('Path `imageUrl` is required.');
  });

  it('has a required topText field', () => {
    const meme = new Meme({
      name: 'Cosmo',
      imgUrl: 'http://www.google.com',
      bottomText: 'on bottom'
    });

    const errors = meme.validateSync().errors;

    expect(errors.topText.message).toEqual('Path `topText` is required.');
  });

  it('has a required bottomText field', () => {
    const meme = new Meme({
      name: 'Cosmo',
      topText: 'on top',
      imgUrl: 'http://www.google.com'
    });

    const errors = meme.validateSync().errors;

    expect(errors.bottomText.message).toEqual('Path `bottomText` is required.');
  });

});
