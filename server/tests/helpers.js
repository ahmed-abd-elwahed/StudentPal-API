const createUser = async ({
  username, password, name, api,
}) => {
  const userId = await (await api.post('/api/users').send({ username, name, pass: password })).body.id;
  return userId;
};

const authUser = async ({ username, password, api }) => {
  const token = await (await api.post('/api/login').send({ username, pass: password })).body.token;
  return token;
};

const createUserAndLogin = async (username, password, name, api) => {
  const user = {
    username, password, name, api,
  };
  const userId = await createUser(user);
  const token = await authUser(user);

  return { token, userId };
};

module.exports = {
  createUser,
  authUser,
  createUserAndLogin,
};
