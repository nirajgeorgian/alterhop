import { fireEvent, render } from '@testing-library/react';
import { render as readerInDOM, unmountComponentAtNode } from 'react-dom'

import App from 'app'
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

export const renderWithRouter = (
	ui: React.ReactElement,
	{
		route = '/',
		history = createMemoryHistory({ initialEntries: [route] }),
	} = {}
) => {
	const Wrapper: React.FC<any> = ({ children }) => (
		<Router history={history}>{children}</Router>
	)

	return {
		...render(ui, { wrapper: Wrapper }),
		// adding `history` to the returned utilities to allow us
		// to reference it in our tests (just try to avoid using
		// this to test implementation details).
		history,
	}
}


test("render's without cranshing", () => {
	const history = createMemoryHistory()
	const div = document.createElement('div')

	readerInDOM(
		<Router history={history}>
			<App />
		</Router>, div)
	unmountComponentAtNode(div)
})

test("full pp rendering/navigating", async () => {
	const { container, getByTestId, history } = renderWithRouter(<App />)

	// start with the home route secondary navigation rendering test
	expect(container.innerHTML).toMatch(/Jobs/)
	expect(container.innerHTML).toMatch(/Companies/)

	// we need to click two timed because we have primary/secondary navigation
	fireEvent.click(getByTestId('profile'))
	fireEvent.click(getByTestId('sec-messages'))

	// check that the content changed to the new page
	expect(history.location.pathname).toBe("/profile/messages");

	// i can still click onother available links
	fireEvent.click(getByTestId('sec-profile'))
	expect(history.location.pathname).toBe("/profile/username")
})
