

exports.isAuth = (req , res , next) =>{
    let user = req.user && req.params.userId && req.user._id == req.params.userId
    
    if(!user){
        return res.status(400).json({
            error : 'access denid.you are not auth',
            
        })
    } 

    next()
}