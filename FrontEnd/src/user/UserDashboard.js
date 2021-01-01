import React from 'react'
import Layout from '../Core/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'

const UserDashboard = () => {


    const userLinks = () => {

        return (
            <>
                <div className='card'>
                    <h2 className='card-header'>User Links</h2>
                    <ul className='list-group'>
                        <li className='list-group-item'>
                            <Link className='list-group-link' to='/cart'>My Cart</Link>
                        </li>

                        <li className='list-group-item'>
                            <Link className='list-group-link' to='/profile/update'>Update Profile</Link>
                        </li>
                    </ul>

                </div>

            </>
        )
    }


const userInformation = () => {

    return(
        <div className='card mb-3'>
                <h3 className='card-header'>User Information</h3>
                <ul className='list-group'>
                    <li className='list-group-item'>{name}</li>
                    <li className='list-group-item'>{email}</li>
                    <li className='list-group-item'>{rol == 1 ? "Admin" : 'Regestred User'}</li>
                </ul>
            </div>
    )
}

const userHistory = () => {

    return (
        <div className='card mb-3'>
                <h3 className='card-header'>Prchase History</h3>
                <ul className='list-group'>
                    <li className='list-group-item'>history</li>
                </ul>
        </div>
    )
}










    const { user: { name, email, rol } } = isAuthenticated()
    return (
        <Layout title=' User Dashboard' description='Node And React Ecommarce Web site Dashboard' classnames='container col-md-4npm'>
            <div className='row'>
                <div className='col-md-3'>
                    {userLinks()}
                </div>
                <div className='col-md-9'>
                    {userInformation()}
                    {userHistory()}

                </div>
            </div>
            
         

        </Layout>
    )
}

export default UserDashboard
