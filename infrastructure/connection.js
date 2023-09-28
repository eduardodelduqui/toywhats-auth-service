const env = require('dotenv').config()
const mongoose = require("mongoose")

const db_user = env.parsed.DB_USER
const db_password = env.parsed.DB_PASSWORD
const db_host = env.parsed.DB_HOST
const db_name = env.parsed.DB_NAME

module.exports.db = () => {
    const uri = `mongodb+srv://${db_user}:${db_password}@${db_host}/${db_name}?retryWrites=true&w=majority`
    mongoose.connect(uri, { useNewUrlParser: true })
    return mongoose.connection
}