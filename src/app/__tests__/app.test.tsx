import '__mocks__/match-media.mock'; // Must be imported before the tested file

import { render, unmountComponentAtNode } from 'react-dom'

import App from 'app'
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

test("render's without cranshing", () => {
	const history = createMemoryHistory()
	const div = document.createElement('div')

	render(
		<Router history={history}>
			<App />
		</Router>, div)
	unmountComponentAtNode(div)
})
