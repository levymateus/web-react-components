import { HTMLAttributes } from "react"

export type Status = 'default' | 'success' | 'error' | 'warning' | 'info'

export interface BaseProps {
  status: Status;
  focused?: boolean;
  active?: boolean;
}

export interface TextFieldProps extends HTMLAttributes<
  Omit<HTMLInputElement, 'defaultValue' | 'maxLength'>
  > {
  id: string
  label: string
  helperText?: string | null
  endIcon?: React.ReactNode | null
  maxLength?: number
  status?: Status
}
