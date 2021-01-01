const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../Models/User')


exports.requireSignin = (req , res ,next) => {
    let token = req.body.token || req.headers['x-access-token'] || req.query.token

    
    if(token){
        return jwt.verify(token,process.env.JWT_SECRET,(err ,decode) =>{
            if(err){
                return res.json({
                    data : 'Not Exist This Token',
                    success : false
                })
            }
            const { _id } = decode
            User.findById(_id).exec((err , user )=>{
                if(err || !user){
                    return res.json({
                        err : 'not found'
                    })
                }

                req.user = user
                next()
            })
           
        })
    }

    return res.json({
        Error : 'please signup' 
    })

}
