const express = require('express')
const router = express.Router()
const { signUp , signIn , signOut } = require('../Controllers/authController')
const {signupValidator} = require('../Validator/index')
const {requireSignin} = require('../Middkeware/tokenVerify')

//router
router.post('/signup' ,signupValidator, signUp )
router.post('/signin', signIn)
router.get('/signout', signOut)
router.get('/test', requireSignin ,(req , res) =>{ res.json({data : req.user})})

module.exports = router