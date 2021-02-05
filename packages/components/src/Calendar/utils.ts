import addDays from 'date-fns/addDays'
import startOfMonth from 'date-fns/startOfMonth'
import subDays from 'date-fns/subDays'
import { Action } from './contants'

const build = (start: Date): Date[] => {
  const dates = new Array<Date>(42)
  const month = { start: startOfMonth(start) }
  dates[0] = subDays(month.start, month.start.getDay())
  for (let index = 1; index < dates.length; index += 1) {
    dates[index] = addDays(new Date(dates[index - 1]), 1)
  }
  return dates
}

export const initializer = (start: Date): Date[] => build(start)

export const reducer = (_state: Date[], action: Action<string, unknown>): Date[] => build(action.payload as Date)

export const focus = (index: number): void => {
  const button = document.getElementById(`calendar-date-button-${index}`)
  if (button) {
    button.focus()
  }
}

export const isEqual = (left: Date, right: Date): boolean => {
  return (
    left.getDate() === right.getDate() &&
    left.getMonth() === right.getMonth() &&
    left.getFullYear() === right.getFullYear()
  )
}
