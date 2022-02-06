const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { privKey } = require('../utils/getKeyPair');

// eslint-disable-next-line consistent-return
loginRouter.post('/', async (req, res) => {
  const { username, pass } = req.body;
  const user = await User.findOne({ username });
  const verified = user ? await bcrypt.compare(pass, user.password) : false;
  if (!user || !verified) {
    return res.status(401).json({
      error: 'Invalid username or password',
    });
  }

  const userForToken = {
    sub: user._id,
  };

  const token = jwt.sign(userForToken, privKey, { algorithm: 'RS256' });

  res
    .status(200)
    .send({
      token, id: user.id, username: user.username, name: user.name, image: user.image,
    });
});

module.exports = loginRouter;
