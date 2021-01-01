import React from 'react'
import Menu from '../Core/Menu'

const Layout = ({title = 'title' , description = 'description' , children ,classnames}) => {
    return (
        <>
        <Menu />
        <div className='jumbotron'>
            <h2>{title}</h2>
            <p className='lead'>{description}</p>
        </div>
        <div className={classnames}>
            {children}
        </div>
        </>
    )
}

export default Layout
