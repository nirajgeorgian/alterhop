import { Helmet } from 'react-helmet'
import React from 'react'

interface IBasePageProps {
  title: string
  description: string
  keywords: Array<string>
}

const BasePage: React.FC<IBasePageProps> = ({ description, keywords, children, title }) =>
  <>
    <Helmet>
      <title> {title} </title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(",")} />
    </Helmet>
    <div className="layout">
      {children}
    </div>
  </>

export default BasePage