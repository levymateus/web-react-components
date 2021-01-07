import React, { HTMLAttributes, useEffect, useMemo, useRef, useState } from 'react'
import * as Style from './style'
import { Status } from './TextField.types'

export interface Props extends HTMLAttributes<
  Omit<HTMLInputElement, 'defaultValue' | 'maxLength'>
> {
  id: string;
  label: string;
  helperText?: string | null;
  endIcon?: React.ReactNode | null;
  maxLength?: number;
  status?: Status;
}

export const TextField = React.forwardRef<
  HTMLInputElement, Props
>(({
  id,
  label,
  defaultValue,
  maxLength,
  onChange,
  onFocus,
  onBlur,
  helperText: helperTextProp,
  status = 'default',
  endIcon,
  ...rest
}, forwardedRef) => {
  const innerRef = useRef<HTMLInputElement>(null)
  const ref = forwardedRef as React.MutableRefObject<HTMLInputElement> || innerRef
  const [chars, setChars] = useState(0)
  const [shrink, setShrink] = useState(false)
  const [focused, setFocused] = useState(false)

  const HelperTextComponent = useMemo(() => {
    if (helperTextProp) {
      if (Array.isArray(helperTextProp) && helperTextProp.length) {
        return <Style.HelperText status={status}>{helperTextProp.join(' ')}</Style.HelperText>
      }
      return <Style.HelperText status={status}>{helperTextProp}</Style.HelperText>
    }
    return null
  }, [helperTextProp, status])

  const handleChange = (evt : React.ChangeEvent<HTMLInputElement>) => {
    setChars(evt.target.value.length)
    if (onChange) { onChange(evt) }
  }

  const handleLabelClick = () => {
    setShrink(true)
    if (ref && ref.current) {
      ref.current.select()
    }
  }

  const handleInputFocus = (evt : React.FocusEvent<HTMLInputElement>) => {
    setFocused(true)
    setShrink(true)
    if (onFocus) { onFocus(evt) }
  }

  const handleInputBlur = (evt : React.FocusEvent<HTMLInputElement>) => {
    setFocused(false)
    setShrink(() => ref && ref.current && ref.current.value.length > 0)
    if (onBlur) { onBlur(evt) }
  }

  useEffect(() => {
    if (ref && ref.current) {
      setChars(ref.current.value.length)
    }
  }, [ref, setChars])

  useEffect(() => {
    if (ref && ref.current) {
      if (ref.current.value.length > 0) {
        setShrink(true)
      }
    }
  }, [ref, setShrink])

  return <Style.Container>
    <Style.Label
      htmlFor={id}
      onClick={handleLabelClick}
      data-testid="wrc-text-field-label-testid"
      active={shrink}
      focused={focused}
      status={status}
    >{label}</Style.Label>
    <Style.Input
      {...rest}
      id={id}
      ref={ref}
      status={status}
      data-testid="wrc-text-field-testid"
      onChange={handleChange}
      maxLength={maxLength}
      onBlur={handleInputBlur}
      onFocus={handleInputFocus}
      defaultValue={defaultValue && maxLength ? defaultValue.toString().substring(0, maxLength) : defaultValue}
    />
    {endIcon ? <Style.Icon status={status}>{endIcon}</Style.Icon> : null}
    {chars > 0 && maxLength && focused ?
      <Style.Counter
        focused={focused}
        status={status}
        data-testid="wrc-text-field-length-testid"
      >
        <span>{chars} / {maxLength}</span>
      </Style.Counter> : null}
    {HelperTextComponent}
  </Style.Container>
})

export default TextField
