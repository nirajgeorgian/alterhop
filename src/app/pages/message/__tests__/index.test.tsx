/*
 * Created on Sat May 02 2020
 *
 * Test case for message page under profile
 * /profile/messages
 *
 * @author nirajgeorgian@oojob.io (Niraj Georgian)
 *
 * Copyright (c) 2020 - oojob
 */

import Message from 'app/pages/message'
import React from 'react'
import { render } from '@testing-library/react'

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