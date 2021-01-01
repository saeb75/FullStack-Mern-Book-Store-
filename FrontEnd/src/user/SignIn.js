import React, { useState } from 'react'
import Layout from '../Core/Layout'
import { API } from './../Config'
import { Link ,Redirect ,withRouter} from 'react-router-dom'
import { useSpring, animated, config } from 'react-spring'
import { signin ,authenticate, isAuthenticated } from '../auth/index'

function SignIn({history}) {
  let beforePage = '/'
    if(history.location.state.prevPath == 'undefined'){
        beforePage = '/'
    }
    else if(history.location.state.prevPath == '/signup'){
        beforePage = '/'
    }
    else if(typeof history.location.state.prevPath!== 'undefined'){
        beforePage =history.location.state.prevPath
    }else if(typeof history.location.state.from !=='undefined'){
        beforePage = history.location.state.from.pathname
        
    } 
   
    
    let {user} = isAuthenticated()
    const [errors, setErrors] = useState([])
    const [values, setValues] = useState({

        email: '',
        password: '',
        error: '',
        loading: false,
        redirectsPage :false
    })



    const { email, password, error, loading ,redirectsPage} = values
    const handleChange = name => e => {
        setValues({ ...values, success: false, [name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setValues({...values,loading:true})
        signin({  email , password })
            .then(data => {
                setValues({...values,loading:false})
                if (data.error) {
                    
                 
                    setValues({ ...values, error: true, success: false })
                    setErrors(data.error[0].msg ? [...data.error] : [data.error])

                } else {
                    authenticate(data,() => setValues({ ...values,redirectsPage:true}))
                  
                }
            })

    }


    const props = useSpring({

        opacity: values.error ? 1 : 0,
    })
    const loadingProps = useSpring({

        opacity: loading ? 1 : 0,
    })


    const SignInFrom = () => {


        return (
            <form >
                <div className='form-group'>
                    <label className='text-muted'>Email</label>
                    <input onChange={handleChange('email')} type='email' value={email} className='form-control' autoComplete="off" />
                </div>

                <div className='form-group'>
                    <label className='text-muted'>Pasword</label>
                    <input onChange={handleChange('password')} value={password} type='password' className='form-control' autoComplete="off" />
                </div>
                <button onClick={handleSubmit} className='btn btn-primary'> Sign In</button>
            </form>
        )
    }


    const showError = () => {

        return (
            <animated.div className='alert alert-danger' style={props}>
                {errors}
            </animated.div >
        )
    }


    const showLoading = () => {

        return (
            <div className='alert alert-info' style={{ display: loading ? '' : 'none' }}>
              <h2>loading...</h2>
            </div>
        )
    }
const redirectPage = () =>{

    


    return(
        <>{redirectsPage ? <Redirect to={beforePage?beforePage:'/'} />  : null } </>   
    )
}



    return (
        <>
            <Layout title='Signin Page' description='SignUp Node React FullStack App' classnames='container col-md-4 offset-md-4'>
                {showLoading()}
                {showError()}
                {SignInFrom()}
                {redirectPage()}
            </Layout>

        </>
    )
}

export default withRouter(SignIn) 
