import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import { useHotkey } from './useHotkey'

describe('useHotkey hook test suit', () => {
  it('events fired correctly', () => {
    const handleKeyDown = jest.fn()
    const Component: React.FC = () => {
      useHotkey(handleKeyDown, {
        ref: document,
        hotkey: { key: "Escape" }
      })
      return <button type="button" data-testid="test-id" />
    }
    const { getByTestId } = render(<Component />)
    const button = getByTestId("test-id")
    fireEvent.keyDown(button, { key: "Escape" })
    expect(handleKeyDown).toBeCalled()
    expect(handleKeyDown).toBeCalledTimes(1)
  })
})
