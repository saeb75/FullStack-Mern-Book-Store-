const express = require('express')
const router = express.Router()
const { requireSignin } = require('../Middkeware/tokenVerify')
const {isAuth} = require('../Middkeware/isAuth')
const {isAdmin} = require('../Middkeware/isAdmin')
const {read , update} = require('./../Controllers/userController')
const {signupValidator} = require('../Validator/index')
//router

router.get('/secret/:userId',signupValidator, requireSignin , isAuth,isAdmin, (req ,res )=>{
    res.json({
        data : req.user
        
    })
})
router.get('/user/:userId' , requireSignin , isAuth,isAdmin, read)
router.put('/user/:userId' , requireSignin , isAuth,isAdmin, update)



module.exports = router