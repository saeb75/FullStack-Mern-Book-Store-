import React, { useEffect, useState } from 'react'
import Layout from '../Core/Layout'

import { Link ,withRouter} from 'react-router-dom'
import {useSpring, animated } from 'react-spring'
import {signUp} from '../auth/index'

function SignUp({history}) {


   

    const [errors, setErrors] = useState([])
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        
        success: false

    })

   
    let passwordError =  errors.find(item => item.param == 'password')
    let nameError = errors.find(item => item.param == 'name')
    let emailError = errors.find(item => item.param == 'email')
  

    const { name, email, password, error, success } = values
    const handleChange = name => e => {
        setValues({ ...values, success: false, [name]: e.target.value })
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        signUp({ name, email, password })
            .then(data => {

                if (data.error) {
                 
                    setValues({ ...values, error: true, success: false })
                    setErrors(data.error[0].msg? [...data.error] : [data.error])

                } else {
                   
                    setValues({ ...values, success: true, error: false,name : '',password:'',email:'' })
                    setErrors([])
                }
            })

    }


    const props = useSpring({
     
        opacity:values.error ? 1 : 0,
    } )

    
   
    const SignUpFrom = () => {


        return (
            <form >
                <div className='form-group'>
                    <label className='text-muted'>Name</label>
                    <input onChange={handleChange('name')} type='text' value={name} className='form-control' />
                  {nameError?  <h6 className='alert alert-danger mt-2'>{nameError.msg}</h6> :null}
                </div>

                <div className='form-group'>
                    <label className='text-muted'>Email</label>
                    <input onChange={handleChange('email')} type='email' value={email} className='form-control' autoComplete="off" />
                    {emailError?<h6 className='alert alert-danger mt-2'>{emailError.msg}</h6> :null}
                </div>

                <div className='form-group'>
                    <label className='text-muted'>Password</label>
                    <input onChange={handleChange('password')}  value={password} type='password' className='form-control' autoComplete="off"/>
                   {passwordError? <h6 className='alert alert-danger mt-2'>{passwordError.msg}</h6> :null}
                </div>
                <button onClick={handleSubmit} className='btn btn-primary'> Sign Up</button>

            </form>
        )
    }
   
 const showError = () => {
        
        return (
            <>
                {errors.map((item, i) => {
                    return item.msg ? null : <h6 className='alert alert-danger' key={i}>ایمیل  تکراری میباشد</h6>
                })}
            </>
         
        )
    } 
    const showSuccess = () => {

        return (
            <div className='alert alert-danger' style={{ display: success ? '' : 'none' }}>
                Youre Signup corrently.Please <Link to={{pathname: '/signin', state: { prevPath: history.location.pathname }}}>Sign In</Link>
            </div>
        )
    }




    return (
        <>
            <Layout title='SignUp Page' description='SignUp Node React FullStack App' classnames='container col-md-4 offset-md-4'>
                {showError()}
                {showSuccess()}
                {SignUpFrom()}
            </Layout>

        </>
    )
}

export default withRouter(SignUp)
