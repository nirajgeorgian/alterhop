import 'index.less'

import * as serviceWorker from './serviceWorker'

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

import { ApolloProvider } from '@apollo/client'
import App from 'app'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import history from 'utils/history'

const render = module.hot ? ReactDOM.render : ReactDOM.hydrate
const { REACT_APP_GATEWAY_API } = process.env
const MOUNT_NODE = document.getElementById('react-content')

const client = new ApolloClient({
	ssrMode: true,
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: REACT_APP_GATEWAY_API
	})
})

render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<Router history={history}>
				<App />
			</Router>
		</ApolloProvider>
	</React.StrictMode>,
	MOUNT_NODE
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
