import MessageCard, { IUserMessageProps } from 'components/message/list'

import React from 'react'
import moment from 'moment'
import { render } from '@testing-library/react'

const props: IUserMessageProps = {
  name: "Dodo Duck",
  job: "Full Tsack Developer",
  time: moment(),
  summary: "dodo duck lives here",
  isActive: false,
  read: false
}

test("message list component render's properly", async () => {
  const { asFragment } = render(<MessageCard {...props} />)

  expect(asFragment()).toMatchSnapshot()
})

test("render's message list card", async () => {
  const { getByTestId, container } = render(<MessageCard {...props} />)

  // const container = getByTestId("message-list-card")

  // Assert
  expect(container).toHaveTextContent(props.name)
  expect(container).toHaveTextContent(props.job)
  expect(container).toHaveTextContent(props.summary)

  // asserted because it is applied inline
  expect(container).toHaveStyle("padding: '1rem'")
})