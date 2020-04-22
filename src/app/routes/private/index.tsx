import React, { useEffect } from "react"

import { Route } from "react-router-dom"
import { useAuth } from "app/contexts/auth"

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth()

  useEffect(() => {
    if (isLoading || isAuthenticated) {
      return
    }
    const fn = async () => {
      if (loginWithRedirect) {
        await loginWithRedirect({
          appState: { targetUrl: window.location.pathname }
        })
      }
    }
    fn()
  }, [isLoading, isAuthenticated, loginWithRedirect, path])

  const render = props =>
    isAuthenticated === true ? <Component {...props} /> : null

  return <Route path={path} render={render} {...rest} />
}

export default PrivateRoute