const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../lib/app');
const Meme = require('../../lib/models/Meme');
const chance = require('chance')();


describe('memes route tests', () => {
  const createMeme = () => {
    return Meme.create({
      name: chance.name(),
      imageUrl: chance.url(),
      topText: chance.word(),
      bottomText: chance.sentence()
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
      .post('/api/v1/memes')
      .send({
        name: 'cool new meme',
        imageUrl: 'http://mymeme.com',
        topText: 'this is',
        bottomText: 'a meme'
      });

      expect(newMeme.body).toEqual({
        name: 'cool new meme',
        imageUrl: 'http://mymeme.com',
        topText: 'this is',
        bottomText: 'a meme',
        _id: expect.any(String),
        __v: 0
      });
  });

  it('can get all memes by id', async () => {
    createMeme();
    createMeme();
    
    const getMemes = await request(app)
      .get('/api/v1/memes');
      
    expect(getMemes.body).toHaveLength(2);
  });
});
