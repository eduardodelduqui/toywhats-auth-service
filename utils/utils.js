const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { randomBytes, scrypt } = require('crypto')

const SECRET_KEY = process.env.SECRET_KEY

module.exports.generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY)
}

module.exports.verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return reject(err)
      }
      resolve(decoded)
    })
  })
}

module.exports.generateDerivedKeyScrypt = async (password, salt) => {
  return new Promise((resolve, reject) => {
    const keyLength = 64; // Comprimento da chave em bytes
    const N = 16384; // Número de iterações
    const r = 8;     // Bloco de memória
    const p = 1;     // Paralelismo

    scrypt(password, salt, keyLength, { N, r, p }, (err, derivedKey) => {
      if (err) {
        reject(err);
      }
      resolve(derivedKey.toString('hex'));
    });
  });
}

module.exports.generateSalt = (length) => {
  return randomBytes(length).toString('hex');
}