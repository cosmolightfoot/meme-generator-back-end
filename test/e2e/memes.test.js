const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../lib/app');
const Meme = require('../../lib/models/Meme');


describe('memes route tests', () => {
  const createMeme = () => {
    return Meme.create({
      name: 'My cool meme',
      imgUrl: 'http://somewhere.com',
      topText: 'this is',
      bottomText: 'a meme'
    });
  };

  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/memeify', {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true
    });
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can post a new meme', async () => {
    const newMeme = await request(app)
      .post('/memes')
      .send({
        name: 'cool new meme',
        imageUrl: 'http://mymeme.com',
        topText: 'this is',
        bottomText: 'a meme'
      });

      expect(newMeme).toEqual({
        name: 'cool new meme',
        imageUrl: 'http://mymeme.com',
        topText: 'this is',
        bottomText: 'a meme',
        _id: expect.any(String),
        __v: 0
      });
  });
});
