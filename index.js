const env = require('dotenv').config()
const express = require('express')
const connection = require('./infrastructure/connection')
const routes = require("./routes/routes")
const cors = require('cors')

const PORT = env.parsed.PORT || 4000;

const db = connection.db()
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB:'))
db.once('open', () => {
    console.log('DB Connected')
    const app = express();
    app.use(cors())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(routes)

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
})