const express = require('express')
const router = express.Router()
const { requireSignin } = require('../Middkeware/tokenVerify')
const {isAuth} = require('../Middkeware/isAuth')
const {isAdmin} = require('../Middkeware/isAdmin')

const { create ,searchList, productById ,list , remove ,update ,single ,listRelated ,listCatogories ,searchProduct ,photo}  = require('../Controllers/productController')




router.post('/product/create/:userId',requireSignin ,isAuth ,isAdmin,create)
router.get('/product/:productId' , single)
router.get('/products' , list)
router.get('/products/search', searchList)
router.delete('/product/:productId/:userId',requireSignin ,isAuth ,isAdmin, remove)
router.put('/product/:productId/:userId',requireSignin ,isAuth ,isAdmin, update)
router.get('/products/related/:productId', listRelated)
router.get('/products/catogories', listCatogories)
router.post('/products/by/search', searchProduct)
router.get('/product/photo/:productId', photo)



router.param('productId',productById)
module.exports = router