import React from 'react'
import { fireEvent, getByTestId, render } from '@testing-library/react'

import { Calendar } from '.'

describe('Calendar component test suit', () => {
  it('events fired correctly', () => {
    const handleChange = jest.fn()
    const { getByTestId } = render(<Calendar onChange={handleChange} />)
    const button = getByTestId("calendar-date-button-1")
    fireEvent.click(button)
    expect(handleChange).toBeCalled()
    expect(handleChange).toBeCalledTimes(1)
  })
})
