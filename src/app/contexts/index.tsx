import React from 'react'
import { withRouter } from 'react-router-dom'

const ContextsBase: React.FC = ({ children }) => {

  return (
    <>
      {children}
    </>
  )
}

export const Contexts = withRouter(ContextsBase)
export default Contexts