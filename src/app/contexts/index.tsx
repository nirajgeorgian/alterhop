import React from 'react'
import { ResponsiveProvider } from 'app/contexts/responsive'
import { withRouter } from 'react-router-dom'

const ContextsBase: React.FC = ({ children }) => {

  return (
    <>
      <ResponsiveProvider>
        {children}
      </ResponsiveProvider>
    </>
  )
}

export const Contexts = withRouter(ContextsBase)
export default Contexts