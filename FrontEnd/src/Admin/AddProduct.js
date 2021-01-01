import React from 'react'
import { useState ,useEffect } from 'react'
import Layout from '../Core/Layout'
import { isAuthenticated } from '../auth'
import { createProduct ,getCategories} from './apiAdmin'
import { Link } from 'react-router-dom'

const AddCategory = () => {

    const [value, setValue] = useState({
        name: '',
        description: '',
        catogories: [],
        catogory: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: '',
        price : ''

    })

    const { 
         formData,
        redirectToProfile,
        createdProduct,
        loading,
        error,
        price,
        photo,
        quantity,
        shipping,
        catogory,
        catogories,
        description,
        name
    } = value
    useEffect(() => {
       init()
      
    }, [])


    const { user, token } = isAuthenticated()
    const handleChange = name => (e) =>{

        const values = name === 'photo' ? e.target.files[0] : e.target.value
       
        formData.set(name , values)
        setValue({...value,[name]:values,error:'' ,createdProduct:''})

    }

    const handleSubmited = (e) =>{
        e.preventDefault()
        setValue({...value,loading:true})
        createProduct(token , formData , user._id ).then(data => {
            setValue({...value,loading:false})
            if(data.error){
           
                setValue({...value,error : data.error})
            }else{
           
                setValue({...value,name:'',
                price:'',
                description : '',
                photo : '',
                price :'',
                createdProduct : true
            })
            }
        })

    }


const init = () =>{
    getCategories().then(data => {

        if(data.error){
            setValue({...value,error:data.error})
        }else{
            setValue({...value,catogories :[...data] ,formData : new FormData()})
        }
    })

}







    const newPostForm = () => {
        return (
            <>
                <form onSubmit={handleSubmited}>
                    <h4>Post Photo</h4>
                    <div className='form-group'>
                        <label className='btn btn-outline-secondary'>
                            <input type='file' name='photo'  onChange={handleChange('photo')} accept='image/*'  className='from-control' />
                        </label>
                    </div>

                    <div className='form-group'>
                        <label className='text-muted'>Name</label>
                        <input type='text' onChange={handleChange('name')} value={name} className='form-control' />
                    </div>

                    <div className='form-group'>
                        <label className='text-muted'>Description</label>
                        <textarea type='text' onChange={handleChange('description')} value={description} className='form-control' />
                    </div>

                    <div className='form-group'>
                        <label className='text-muted'>Price</label>
                        <input type='number' onChange={handleChange('price')} value={price} className='form-control' />
                    </div>

                    <div className='form-group'>
                        <label className='text-muted'>Category</label>
                        <select 
                         onChange={handleChange('catogory')}
                        value={catogory}
                          className='form-control'>
                              <option >Select Catogery </option>
                               {catogories && catogories.map((item , i) => {
                                  return   <option key={i} value={item._id}>{item.name} </option>
                                  })
                              }  
                              
                            
                           </select>
                    </div>

                    <div className='form-group'>
                        <label className='text-muted'>Quantity</label>
                        <input type='number'
                         onChange={handleChange('quantity')}
                          value={quantity}
                          
                          className='form-control' />
                               
                     </div>

                     <div className='form-group'>
                        <label className='text-muted'>Shipping</label>
                        <select 
                         onChange={handleChange('shipping')}
                         value={shipping}
                          className='form-control'>
                               <option >Select Shipping </option>
                               <option value='0'>No</option>
                               <option value='1'>Yes</option>
                           </select>
                    </div>

                    <button className='btn btn-outline-primary mb-5'>Create Product</button>
                </form>

            </>

        )
    }






    const goBack = () => {
        return (
            <div className='mb-5 '>
                <Link to='/admin/dashboard' className='text-danger' >Admin Dashboard</Link>
            </div>
        )
    }

    const showSuccess = () => {
        if(createdProduct){
            return(
                  <h5 className='alert alert-success'>{createdProduct} Product Is Created </h5>
            )
        }
    }

    const showError = () => {
        if(error){
            return(
                    <h5 className='alert alert-danger'>{error}</h5>
            )
        }
    }
    return (
        <Layout title='Create Product' description={`God Day ${user.name} `} classnames='container col-md-4npm'>
            <div className='row'>
                <div className='col-md-8'>
                    {goBack()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    )
}

export default AddCategory
