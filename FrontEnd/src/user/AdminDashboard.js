import React from 'react'
import Layout from '../Core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {


    const AdminLinks = () => {

        return (
            <>
                <div className='card'>
                    <h2 className='card-header'>User Links</h2>
                    <ul className='list-group'>
                        <li className='list-group-item'>
                            <Link className='list-group-link' to='/create/category'>Create Catogory</Link>
                        </li>

                        <li className='list-group-item'>
                            <Link className='list-group-link' to='/create/product'>Create Product</Link>
                        </li>
                    </ul>

                </div>

            </>
        )
    }


const AdminInformation = () => {

    return(
        <div className='card mb-3'>
                <h3 className='card-header'>Admin Information</h3>
                <ul className='list-group'>
                    <li className='list-group-item'>{name}</li>
                    <li className='list-group-item'>{email}</li>
                    <li className='list-group-item'>{role == 1 ? "Admin" : 'Regestred User'}</li>
                </ul>
            </div>
    )
}




    const { user: { name, email, role } } = isAuthenticated()
    return (
        <Layout title=' User Dashboard' description='Node And React Ecommarce Web site Dashboard' classnames='container col-md-4npm'>
            <div className='row'>
                <div className='col-md-3'>
                    {AdminLinks()}
                </div>
                <div className='col-md-9'>
                    {AdminInformation()}
                </div>
            </div>
            
         

        </Layout>
    )
}

export default AdminDashboard
