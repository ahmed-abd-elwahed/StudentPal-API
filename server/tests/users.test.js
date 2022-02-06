const mongoose = require('mongoose');
const supertest = require('supertest');
const { createUser, authUser } = require('./helpers');
const app = require('../app');

const api = supertest(app);
const endpoint = '/api/users/';
let userId = '';
let token = '';
describe('User POST endpoint /api/users/', () => {
  const user = { username: 'Tsting Username', pass: 'verysecret123', name: 'Secret name' };

  test('Create new user succefully', async () => {
    await api
      .post(endpoint)
      .send(user)
      .expect(200)
      .expect((res) => {
        userId = res.body.id;
        return res.body.username === user.username;
      });
    token = await authUser({ api, username: user.username, password: user.pass });
  });

  test('Duplicate username error', async () => {
    await api
      .post(endpoint)
      .send(user)
      .expect(400);
  });

  test('Invalid password length of password is less than 3', async () => {
    await api
      .post(endpoint)
      .send({ ...user, pass: '21' })
      .expect(403)
      .expect((res) => res.body.error === 'Password is less than 3 characters');
  });
});

describe('User GET endpoint /api/users/', () => {
  test('Get all users endpoint', async () => {
    await api
      .get(endpoint)
      .expect(200)
      .expect((res) => res.body.length === 1);
  });

  test('Get specefic user /:id', async () => {
    await api
      .get(endpoint + userId)
      .expect(200)
      .expect((res) => res.body.id === userId);
  });
});

describe('User PUT endpoint /api/users/:id', () => {
  test('Change user img succefully', async () => {
    await api
      .put(endpoint + userId)
      .set('Authorization', `Bearer ${token}`)
      .send({ image: 'newImage' })
      .expect(200)
      .expect((res) => res.body.image === 'newImage');
  });

  test('Change user name succefully', async () => {
    await api
      .put(endpoint + userId)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'newName' })
      .expect(200)
      .expect((res) => res.body.name === 'newName');
  });

  test('Change username and image succefully', async () => {
    await api
      .put(endpoint + userId)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'newName1', image: 'newImage1' })
      .expect(200)
      .expect((res) => res.body.name === 'newName1' && res.body.image === 'newImage1');
  });

  test('Not owner of this user error', async () => {
    const { token: token2 } = createUser({
      api, username: 'RandomUser', password: 'secretpassword', name: 'randomName',
    });
    await api
      .put(endpoint + userId)
      .set('Authorization', `Bearer ${token2}`)
      .expect(401);
  });

  test('Invalid token', async () => {
    await api
      .put(endpoint + userId)
      .set('Authorization', 'Bearer InvalidTOken')
      .send({ name: 'potato' })
      .expect(401);
  });
});

afterAll(async () => {
  const collections = await mongoose.connection.db.collections();
  const promises = [];

  collections.forEach((collection) => {
    promises.push(collection.deleteMany({}));
  });

  await Promise.all(promises);

  mongoose.connection.close();
}, 10000);
