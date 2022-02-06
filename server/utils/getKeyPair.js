const fs = require('fs');
const path = require('path');

// Get Public key

const getPubKey = () => {
  const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
  const key = fs.readFileSync(pathToKey, 'utf8');
  return key;
};

const getPrivKey = () => {
  const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
  const key = fs.readFileSync(pathToKey, 'utf8');
  return key;
};

const privKey = getPrivKey();
const pubKey = getPubKey();
module.exports = {
  privKey,
  pubKey,
};
