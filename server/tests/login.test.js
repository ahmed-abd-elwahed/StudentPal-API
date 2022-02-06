const mongoose = require('mongoose');
const supertest = require('supertest');
const { createUser } = require('./helpers');
const app = require('../app');

const api = supertest(app);
const endpoint = '/api/login/';

describe('Testiing Login endpoint /api/login', () => {
  const user = { username: 'potato', password: 'verysecret123', name: 'Secret Name' };

  test('Create User', async () => {
    createUser({
      api, ...user,
    });
  });

  test('Login Fails if wrong username ', async () => {
    await api
      .post(endpoint)
      .send({ username: 'WrongUsername', pass: user.password })
      .expect(401)
      .expect((res) => res.body.error === 'Invalid username or password');
  });

  test('Login Fails if wrong password ', async () => {
    await api
      .post(endpoint)
      .send({ username: user.username, pass: 'WrongPassword' })
      .expect(401)
      .expect((res) => res.body.error === 'Invalid username or password');
  });

  test('Succefully login', async () => {
    await api
      .post(endpoint)
      .send({ username: user.username, pass: user.password })
      .expect(200)
      .expect((res) => res.body.token.length > 64);
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
