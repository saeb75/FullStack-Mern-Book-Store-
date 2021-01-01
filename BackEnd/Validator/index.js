const { validationResult } = require("express-validator")

exports.signupValidator = (req , res ,next) => {
    req.check('name' , 'فیلد نام را پر کنید').notEmpty()
    req.check('email' , 'ایمیل را به درستی وارد کنید').isEmail()
    req.check('email' , 'تعداد کارکتر ایمیل باید بین 4 و 32 باشد').isLength({min : 4 ,max:32 })
    req.check('password' , 'فیلد پسورد را پر کنید').notEmpty()
    req.check('password')
        .isLength({min : 4 , max : 32})
        .withMessage('تعداد کاراکتر رمز باید بین 4 و 32 باشد')
        .matches(/\d/)
        .withMessage('رمز باید شامل عدد باشد')
        
        const error = req.validationErrors()
        console.log(error)

        if(error){ 
       
            return res.status(400).json({error : error})
        }
        next()
}