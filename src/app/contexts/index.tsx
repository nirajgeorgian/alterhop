/*
 * Created on Thu April 23 2020
 *
 * Wrapper component to assemble all the context provider and pass down the line to app
 *
 * @author nirajgeorgian@oojob.io (Niraj Georgian)
 *
 * Copyright (c) 2020 - oojob
 */

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