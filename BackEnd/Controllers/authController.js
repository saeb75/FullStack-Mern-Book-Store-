require('dotenv').config()
const User = require('../Models/User')
const { errorHandler } = require('../Helpers/ErrorHamdler')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const { userTransform } = require('../Transform/userTransform')
const cookieParser = require('cookie-parser')



exports.signUp = (req, res) => {

    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)

            })
        }
        res.json({
            data: userTransform.transform(user)
        })
    })
}

exports.signIn = (req, res) => {
    console.log('Cookies: ', req.cookies)
    const { email, password } = req.body
    User.findOne({ email: email }, (err, user) => {

        if (err || !user) {
            return res.status(400).json({
                error: 'not exit a user with this email.please sign up',

                succes: false
            })
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Not Matched Email and Password',
                succes: false
            })
        }


        let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: 86400 })

        res.cookie("access_token ", token, { maxAge: 86400 })

        const { _id, name, email, role } = user;

        return res.json({ token, user: { _id, name, email, role } })

    })

}

exports.signOut = (req, res) => {
    res.clearCookie("t")
    res.json('Sign Out Done')
}




