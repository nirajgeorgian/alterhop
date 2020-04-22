import { useHistory, withRouter } from 'react-router-dom'

import { AuthProvider } from './auth'
import React from 'react'
import { ResponsiveProvider } from 'app/contexts/responsive'

const ContextsBase: React.FC = ({ children }) => {
  const history = useHistory()

  const onRedirectCallback = appState => {
    history.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  }

  return (
    <AuthProvider
      domain={`${process.env.REACT_APP_AUTH0_DOMAIN}`}
      client_id={`${process.env.REACT_APP_AUTH0_CLIENT_ID}`}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <ResponsiveProvider>
        {children}
      </ResponsiveProvider>
    </AuthProvider>
  )
}

export const Contexts = withRouter(ContextsBase)
export default Contexts