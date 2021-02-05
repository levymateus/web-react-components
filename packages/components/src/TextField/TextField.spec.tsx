import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import TextField from './TextField'

describe('TextField component test suit', () => {
  it('chars count with defaultValue renders correct', () => {
    const { getByText, getByTestId } = render(<TextField id="t" label="t" defaultValue="test" maxLength={8} />)
    const input = getByTestId('wrc-text-field-testid')
    fireEvent.focus(input)
    expect(getByText('4 / 8')).toBeTruthy()
  })

  it('chars count with long defaultValue reders correct', () => {
    const { getByTestId, getByText } = render(<TextField id="t" label="t" defaultValue="testing"  maxLength={4} />)
    const input = getByTestId('wrc-text-field-testid')
    fireEvent.focus(input)
    expect((input as HTMLInputElement).value).toBe('test')
    expect(getByText('4 / 4')).toBeTruthy()
  })

  it('chars count correct on change', () => {
    const { getByTestId, getByText } = render(<TextField id="t" label="t" maxLength={8} />)
    const input = getByTestId('wrc-text-field-testid')
    fireEvent.focus(input)
    fireEvent.change(input, { target: { value: 'text' } })
    expect((input as HTMLInputElement).value).toBe('text')
    expect(getByText('4 / 8')).toBeTruthy()
  })

  it('no display chars count when have no maxLength prop', () => {
    const { queryByTestId } = render(<TextField id="t" label="t" />)
    expect(queryByTestId('wrc-text-field-length-testid')).toBeFalsy()
  })

  it('input label text is render correct', () => {
    const { getByText, getByTestId, queryByTestId } = render(<TextField label="label name" id="t" />)
    const input = getByTestId('wrc-text-field-testid')
    fireEvent.focus(input)
    expect(getByText('label name')).toBeTruthy()

    fireEvent.blur(input)
    expect(queryByTestId('wrc-text-field-testid')).toBeTruthy()
  })

  it('select full input text on focus', () => {
    const value = 'text'
    const { getByTestId } = render(<TextField id="t" label="t" defaultValue={value} />)
    const label = getByTestId('wrc-text-field-label-testid')
    const input = getByTestId('wrc-text-field-testid')
    fireEvent.click(label)
    expect((input as HTMLInputElement).selectionStart).toBe(0)
    expect((input as HTMLInputElement).selectionEnd).toBe(value.length)
  })

  it('fire on change correct', () => {
    const handleChange = jest.fn()
    const { getByTestId } = render(<TextField id="t" label="t" onChange={handleChange} />)
    const input = getByTestId('wrc-text-field-testid')
    fireEvent.change(input, { target: { value: 'test' } })
    expect(handleChange).toBeCalled()
    expect(handleChange).toBeCalledTimes(1)
    expect((input as HTMLInputElement).value).toBe('test')
  })
})
