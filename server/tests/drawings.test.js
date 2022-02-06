const mongoose = require('mongoose');
const supertest = require('supertest');
const { createUserAndLogin } = require('./helpers');
const app = require('../app');

const api = supertest(app);

let userId = '';
let token = '';
let token2 = '';
let drawingId = '';
const endpoint = '/api/drawings/';

describe('Drawings POST to create new drawing /api/drawings', () => {
  test('Create new users and login', async () => {
    const user1 = await createUserAndLogin('potato', 'verysecret123', 'Cool Name', api);
    const user2 = await createUserAndLogin('potato2', 'verysecret1232', 'Cool Name2', api);
    userId = user1.userId;
    token = user1.token;
    token2 = user2.token;
  });

  test('Create new drawing succefully', async () => {
    const drawing = { title: 'Great Image', drawing: 'sdascsadawgfdgfdshfghsdgdfase', drawingImg: 'sdascsadawgfdgfdshfghsdgdfase' };
    await api
      .post(endpoint)
      .set('Authorization', `bearer ${token}`)
      .send(drawing)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('Invalid Authentication token', async () => {
    await api
      .post(endpoint)
      .set('Authorization', 'bearer Invalid token')
      .expect(401);
  });
}, 100000);

describe('Drawings GET endpoint working /api/drawings', () => {
  test('Get all drawings', async () => {
    await api
      .get(endpoint)
      .expect(200)
      .expect((res) => res.body.length > 0)
      .expect('Content-Type', /application\/json/);
  });

  test('Get specifec drawing /api/drawings/:id', async () => {
    await api
      .get(endpoint + drawingId)
      .expect(200)
      .expect((res) => res.body.title === 'Great Image')
      .expect('Content-Type', /application\/json/);
  });
}, 100000);

describe('Drawings PUT endpoint /api/drawings/:id', () => {
  const updatedDrawing = { title: 'Updated Drawing', drawing: 'dvsacvdacsaxcsacas', drawingImg: 'dsdavcdsvfdbsdfbds' };
  test('Get the id of drawing', async () => {
    drawingId = await (await api.get(`/api/users/${userId}`)).body.drawings[0];
  });

  test('Like a drawing', async () => {
    await api
      .put(endpoint + drawingId)
      .set('Authorization', `bearer ${token}`)
      .expect((res) => res.body.likes.includes(userId))
      .expect(200);
  });

  test('Update a drawing', async () => {
    await api
      .put(endpoint + drawingId)
      .set('Authorization', `bearer ${token}`)
      .send(updatedDrawing)
      .expect((res) => res.body.title === updatedDrawing.title)
      .expect(200);
  });

  test('Invalid Authentication Token', async () => {
    await api
      .put(endpoint + drawingId)
      .set('Authorization', 'bearer InvalidToken')
      .expect(401);
  });

  test('If the user is not owner of drawing he can not change the drawing', async () => {
    await api
      .put(endpoint + drawingId)
      .set('Authorization', `bearer ${token2}`)
      .send(updatedDrawing)
      .expect(401);
  });
});

describe('Drawings DELETE endpoint /api/drawings/:id', () => {
  test('Invalid auth token', async () => {
    await api
      .delete(endpoint + drawingId)
      .set('Authorization', 'bearer Invalid Token')
      .expect(401);
  });

  test('Invalid drawing id', async () => {
    await api
      .delete(`${endpoint}InvalidDrawingId`)
      .set('Authorization', `bearer ${token}`)
      .expect(400);
  });

  test('Can not delete if not owner of drawing', async () => {
    await api
      .delete(endpoint + drawingId)
      .set('Authorization', `Bearer ${token2}`)
      .expect(403);
  });

  test('Delete a drawing successfully', async () => {
    await api
      .delete(endpoint + drawingId)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);
  });
}, 10000);

afterAll(async () => {
  const collections = await mongoose.connection.db.collections();
  const promises = [];

  collections.forEach((collection) => {
    promises.push(collection.deleteMany({}));
  });

  await Promise.all(promises);

  mongoose.connection.close();
}, 10000);
