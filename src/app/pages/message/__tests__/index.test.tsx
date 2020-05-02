import { fireEvent, render } from '@testing-library/react'

import Message from 'app/pages/message'
import React from 'react'

test("message page render's properly", async () => {
  const { asFragment } = render(<Message />)

  expect(asFragment()).toMatchSnapshot()
})

test("render's message list card", async () => {
  const { getByTestId, container } = render(<Message />)
  const messageTitle = getByTestId("message-title")

  // Assert
  expect(messageTitle).toHaveTextContent("Messages")
})