const express = require('express')
const router = express.Router()
const { requireSignin } = require('../Middkeware/tokenVerify')
const {isAuth} = require('../Middkeware/isAuth')
const {isAdmin} = require('../Middkeware/isAdmin')

const { create ,catogoryById ,single ,remove ,update ,read} = require('../Controllers/catogoryController')




router.post('/catogory/create/:userId',requireSignin,isAuth,isAdmin,create)
router.get('/catogory/:catogoryId',requireSignin,isAdmin,single)
router.get('/catogories',read)
router.delete('/catogory/:catogoryId/:userId',requireSignin,isAdmin,remove)
router.put('/catogory/:catogoryId/:userId',requireSignin,isAdmin,update)

router.param('catogoryId',catogoryById)

module.exports = router