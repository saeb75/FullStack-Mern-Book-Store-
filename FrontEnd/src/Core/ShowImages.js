import React from 'react'
import { createProduct } from '../Admin/apiAdmin'

const ShowImages = ({item , URL}) => {
   
    return (
        <div className='prduct-image'>
            <img src={`http://localhost:8000/api/${URL}/photo/${item._id}`} alt={createProduct.name} width='200px'   />
        </div>
    )
}

export default ShowImages
