const express = require('express')
const User = require('../model/User')
const { generateToken, generateDerivedKeyScrypt, generateSalt } = require('../utils/utils')
const { authenticator } = require('otplib')
const qrcode = require('qrcode')
const router = express.Router()

router.post('/login', async(req, res) => {
    const { phone, password, token2fa } = req.body
    try {
        const user = await User.findOne({ phone })

        if (!user) {
            return res.status(401).send({ message: 'User not found' })
        }

        const derivedKey = await generateDerivedKeyScrypt(password, user.salt)

        if (derivedKey === user.password) {
            const check = authenticator.check(token2fa, user.secret2fa)
            if (check) {
                const token = generateToken({
                    name: user.name,
                    phone: user.phone,
                    password: user.password,
                    salt: user.salt
                })
                return res.status(200).send({token})
            } else {
                return res.status(401).send({ message: 'Token 2fa invalid' });
            }
        } else {
            return res.status(401).send({ message: 'Login or password invalid' });
        }

    } catch (error){
        console.log(error)
        return res.status(500).send({ message: 'Internal Server Error' });
    }
})

module.exports = router