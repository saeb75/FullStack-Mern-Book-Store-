const Catogory = require('./../Models/Catogory')
const {errorHandler} = require('../Helpers/ErrorHamdler')
const _ = require('lodash')

exports.create = (req , res) => {

   let catogory = new Catogory(req.body)
    catogory.save((err,data)=>{
        
        if(err){
            return res.status(400).json({error : errorHandler(err)})
        }
        res.json({
            data : data,
            succes : true
        })
    })

}


exports.catogoryById = (req ,res ,next, id) =>{
    
    Catogory.findById(id).exec((err , catogory) =>{
        if(err || !catogory){
            return res.status(400).json(
                {error : "Not Found Catogory With This Id"
                
            })
        }

        req.catogory = catogory
        next()
    })
}


exports.single = (req ,res) =>{
  let catogory = req.catogory

  return res.json({
      data : catogory
  })
  
}

exports.remove = (req ,res ) =>{

    let catogory = req.catogory
    catogory.remove((err , catogory) =>{
        if(err || !catogory){
            if(err || !catogory){
                return res.status(400).json(
                    {error : "Not Found Catogory With This Id"
                    
                })
            }
        }

        res.json({
            data : 'daleted catogory success'
        })
    })
}

exports.update =  (req , res ) =>{

    let catogory = new Catogory(req.catogory)
    catogory = _.extend(catogory , req.body)

    catogory.save((err,data)=>{
        
        if(err){
            return res.status(400).json({error : errorHandler(err)})
        }
        res.json({
            data : data,
            succes : true
        })
    })

}


exports.read = (req , res)=>{

    Catogory.find().exec((err , catogory)=>{
        if(err){
            return res.json({
                error : "Not Found"
            })
        }

        res.json(
          catogory
        )
    })
}