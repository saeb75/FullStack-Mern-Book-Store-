import React from 'react'
import { useState } from 'react'
import Layout from '../Core/Layout'
import { isAuthenticated } from '../auth'
import { createCategory } from './apiAdmin'
import { Link } from 'react-router-dom'

const AddCategory = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)


    const { user, token } = isAuthenticated()



    const handleChange = (e) => {
        setName(e.target.value)
        setError('')
        setSuccess('')

    }

    const handleSubmited = (e) => {
        e.preventDefault()
        createCategory(token, { name }, user._id).then(data =>{
             
                if(data.error){
                    setError(true)
                
                    
                }else{
               
                    setError("")
                    setSuccess(true)
                }
            })
        setSuccess(false)
        setError('')
        setName('')
    }


    const showSuccess = () => {
        if(success){
            return(
                  <h5 className='alert alert-success'>{name} Category Is Created </h5>
            )
        }
    }

    const showError = () => {
        if(error){
            return(
                    <h5 className='alert alert-danger'>{name} Category Shoud Be Unique</h5>
            )
        }
    }

    const AddCategoryForm = () => {

        return (
            <form onSubmit={handleSubmited}>
                <div className=' form-group' >
                    <label className='text-muted'>Insert Name of New Category</label>
                    <input type='text' className='form-control' autoFocus value={name} onChange={handleChange} required/>
                </div>
                <button className='btn btn-outline-primary' type='submit'>Create Categery</button>
            </form>
        )
    }

    const goBack = () => {
        return (
            <div className='mb-5 '>
                <Link to='/admin/dashboard'className='text-danger' >Admin Dashboard</Link>
            </div>
        )
    }
    return (
        <Layout title='Create Category' description={`God Day ${user.name} `} classnames='container col-md-4npm'>
            <div className='row'>
                <div className='col-md-8'>
                    {goBack()}
                    {showError()}
                    {showSuccess()}
                    {AddCategoryForm()}
                    
                </div>
            </div>
        </Layout>
    )
}

export default AddCategory
