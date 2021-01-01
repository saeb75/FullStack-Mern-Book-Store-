 const {productTransform} = require('./ProductTransform')

exports.userTransform = {
    transform(item){
      return{ 
        name : item.name,
        email : item.email,
        id : item._id
    }} 
}


exports.myProductTransforms = (items) => {
  
    return items.map(item => productTransform.transform(item))


}

