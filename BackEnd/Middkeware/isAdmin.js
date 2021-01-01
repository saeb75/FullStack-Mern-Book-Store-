

exports.isAdmin = (req , res , next) =>{

    if(req.user.role == 0){
        return res.status(400).json({ 
            error : 'access denid. your are not admin'
        })
    }

    next()
}