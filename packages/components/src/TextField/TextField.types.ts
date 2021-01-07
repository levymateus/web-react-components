export type Status = 'default' | 'success' | 'error' | 'warning' | 'info'

export interface BaseProps {
  status: Status;
  focused?: boolean;
  active?: boolean;
}
