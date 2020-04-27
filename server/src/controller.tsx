import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { Request, Response } from 'express'

import { ApolloProvider } from '@apollo/client'
import App from '../../src/app';
import Helmet from 'react-helmet'
import Html from './util/html'
import React from 'react'
import { StaticRouter as Router } from 'react-router-dom'
import assets from './util/assets'
import { getDataFromTree } from "@apollo/react-ssr";
import { renderToStaticMarkup } from 'react-dom/server'

export const baseController = async (req: Request, res: Response) => {
  const { REACT_APP_GATEWAY_API } = process.env
  const client = new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: REACT_APP_GATEWAY_API
    })
  })

  const app = (
    <ApolloProvider client={client}>
      <Router location={req.url} context={{}}>
        <App />
      </Router>
    </ApolloProvider>
  )
  await getDataFromTree(app)

  const content = renderToStaticMarkup(app)
  const initialState = client.extract()
  const helmet = Helmet.renderStatic()
  const data = { content, initialState, helmet, assets }
  const html = renderToStaticMarkup(<Html {...data} />)

  res.status(200)
  res.send(`<!doctype html>${html}`)
  res.end()
}

