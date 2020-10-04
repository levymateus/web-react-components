import * as datefns from "date-fns"
import { Action } from "../contants"

const build = (start: Date): Date[] => {
  const dates = new Array<Date>(42)
  const startOfMonth = datefns.startOfMonth(start)
  dates[0] = datefns.subDays(startOfMonth, startOfMonth.getDay())
  for (let index = 1; index < dates.length; index += 1) {
    dates[index] = datefns.addDays(new Date(dates[index - 1]), 1)
  }
  return dates
}

const initializer = (start: Date): Date[] => {
  return build(start)
}

const reducer = (_state: Date[], action: Action<string, unknown>): Date[] => {
  return build(action.payload as Date)
}

export default reducer
export { initializer }
