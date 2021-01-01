const _ = require('lodash')
const User = require('../Models/User')
const { validationResult } = require("express-validator")

exports.read = (req , res) => {


    let user = req.user
    res.json({
        data : user
    })
}

exports.update = (req , res) => {
    req.check('email' , 'ایمیل را به درستی وارد کنید').isEmail()
    const Errors = req.validationErrors()

        if(error){ 
       
            return res.status(400).json({error})
        }
      
    User.findByIdAndUpdate({_id : req.user._id} , {$set : req.body} ,{new : true} ,(err , user) =>{
        
        if(err){
            return res.status(400).json({
                error : 'not Update please sign in'
            })
        }
        return res.json({
            data : user
        })
      
    })
}