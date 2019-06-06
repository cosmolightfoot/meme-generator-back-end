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
      bottomText: chance.word()
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

  it('can get all memes', async () => {
    await createMeme();
    await createMeme();
    
    const getMemes = await request(app)
      .get('/api/v1/memes');
      console.log(getMemes.body);
    expect(getMemes.body).toHaveLength(2);
  });

  it('can get a meme by id', async () => {
    const memeOne = await request(app)
      .post('/api/v1/memes')
      .send({
        name: 'memeOne',
        imageUrl: 'http://somewhere.com',
        topText: 'top',
        bottomText: 'bottom'
      });
    
    const memeTwo = await request(app)
      .post('/api/v1/memes')
      .send({
        name: 'memeTwo',
        imageUrl: 'http://somehow.com',
        topText: 'toptwo',
        bottomText: 'bottomtwo'
      });
    
    const getMemeOne = await request(app)
      .get(`/api/v1/memes/${memeOne.body._id}`);

      expect(getMemeOne.body).toEqual({
        name: 'memeOne',
        imageUrl: 'http://somewhere.com',
        topText: 'top',
        bottomText: 'bottom',
        _id: memeOne.body._id
      });
  });

  it('can get a meme by name', async () => {
    const memeOne = await request(app)
      .post('/api/v1/memes')
      .send({
        name: 'memeOne',
        imageUrl: 'http://somewhere.com',
        topText: 'top',
        bottomText: 'bottom'
      });
    
    const memeTwo = await request(app)
      .post('/api/v1/memes')
      .send({
        name: 'memeTwo',
        imageUrl: 'http://somehow.com',
        topText: 'toptwo',
        bottomText: 'bottomtwo'
      });
    
    const getMemeOneByName = await request(app)
      .get('/api/v1/memes?name=memeOne');

      expect(getMemeOneByName.body).toEqual([{
        name: 'memeOne',
        imageUrl: 'http://somewhere.com',
        topText: 'top',
        bottomText: 'bottom',
        _id: memeOne.body._id
      }]);
  });
});
