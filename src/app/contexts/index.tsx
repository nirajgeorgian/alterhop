import React from 'react'
import { ResponsiveProvider } from 'app/contexts/responsive'

const Contexts: React.FC = ({children}) => 
  <ResponsiveProvider>
    {children}
  </ResponsiveProvider>

export default Contexts