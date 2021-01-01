import React from 'react'
import {Redirect ,  Route} from 'react-router-dom'
import {isAuthenticated} from './index'

function AdminRout({ Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthenticated().user.role ===1 ? (
          <Component {...props} />
          
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default AdminRout