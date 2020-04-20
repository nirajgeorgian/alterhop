import 'index.less'

import * as serviceWorker from './serviceWorker'

import App from 'app'
import React from 'react'
import { Router } from 'react-router-dom'
import history from 'utils/history'
import { render } from 'react-dom'

const MOUNT_NODE = document.getElementById('react-content')

render(
	<React.StrictMode>
		<Router history={history}>
			<App />
		</Router>
	</React.StrictMode>,
	MOUNT_NODE
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
