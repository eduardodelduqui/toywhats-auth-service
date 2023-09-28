const mongoose = require('mongoose')

const schema = mongoose.Schema({
  name: String,
  phone: String,
  password: String,
  salt: String,
  secret2fa: String,
}, { collection: process.env.COLLECTION_NAME })

module.exports = mongoose.model('User', schema)
