import React from 'react'
import { MdArrowUpward, MdArrowDownward } from 'react-icons/md'
import { cx } from 'emotion'

import format from 'date-fns/format'
import subDays from 'date-fns/subDays'
import addDays from 'date-fns/addDays'
import subMonths from 'date-fns/subMonths'
import addMonths from 'date-fns/addMonths'

import * as reducer from './reducer'
import { StateReducer } from './contants'

import { styles, Button } from './style'

interface Props {
  /**
   * The optional default start date. default value is now date.
   */
  defaultValue?: Date

  /**
   * The optional click event callback fired when an date selected.
   * @param date - The selected date.
   */
  onClick?: (date: Date) => void
}

const focus = (index: number): void => {
  const button = document.getElementById(`calendar-date-button-${index}`)
  if (button) {
    button.focus()
  }
}

const isEqual = (left: Date, right: Date): boolean => {
  return (
    left.getDate() === right.getDate() &&
    left.getMonth() === right.getMonth() &&
    left.getFullYear() === right.getFullYear()
  )
}

export const Calendar: React.FC<Props> = ({
  defaultValue = new Date(),
  onClick
}: Props) => {
  const [date, setDate] = React.useState(defaultValue)
  const [title, setTitle] = React.useState(format(date, 'LLLL yyyy'))
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(date)
  const [focusable, setFocusable] = React.useState(false)
  const [datesList, dispatch] = React.useReducer<StateReducer<Date[], string>, Date>(
    reducer.reducer,
    date,
    reducer.initializer
  )

  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent): void => {
      setFocusable(true)
      switch (event.key) {
        case 'ArrowLeft':
          setDate((prevDate) => {
            const nextDate = subDays(prevDate, 1)
            const index = datesList.findIndex((date) =>
              isEqual(date, nextDate)
            )
            if (index <= 0 || index >= (datesList.length - 1)) {
              setTitle(format(nextDate, 'LLLL yyyy'))
              dispatch({
                payload: nextDate
              })
            }
            return nextDate
          })
          break
        case 'ArrowRight':
          setDate((prevDate) => {
            const nextDate = addDays(prevDate, 1)
            const index = datesList.findIndex((date) =>
              isEqual(date, nextDate)
            )
            if (index <= 0 || index >= (datesList.length - 1)) {
              setTitle(format(nextDate, 'LLLL yyyy'))
              dispatch({
                payload: nextDate
              })
            }
            return nextDate
          })
          break
        case 'ArrowUp':
          setDate((prevDate) => {
            const nextDate = subDays(prevDate, 7)
            const index = datesList.findIndex((date) =>
              isEqual(date, nextDate)
            )
            if (index < 0 || index > (datesList.length - 1)) {
              setTitle(format(nextDate, 'LLLL yyyy'))
              dispatch({
                payload: nextDate
              })
            }
            return nextDate
          })
          break
        case 'ArrowDown':
          setDate((prevDate) => {
            const nextDate = addDays(prevDate, 7)
            const index = datesList.findIndex((date) =>
              isEqual(date, nextDate)
            )
            if (index <= 0 || index > (datesList.length - 1)) {
              setTitle(format(nextDate, 'LLLL yyyy'))
              dispatch({
                payload: nextDate
              })
            }
            return nextDate
          })
          break
        default:
      }
    },
    [datesList]
  )

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return (): void => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  React.useEffect(() => {
    const index = datesList.findIndex((d) =>
      isEqual(d, date)
    )
    focus(index)
  }, [date])

  return (
    <div className={styles}>
      <div id="calendar-nav" className="flex-row-full">
        <div id="calendar-nav-title" className="flex-row-item">
          <div id="calendar-title">{title}</div>
        </div>
        <div className="flex-row-item">
          <button
            type="button"
            className="button item selectable"
            onClick={(): void => {
              setDate((prevDate) => {
                const nextDate = subMonths(prevDate, 1)
                dispatch({
                  payload: nextDate
                })
                setTitle(format(nextDate, 'LLLL yyyy'))
                setFocusable(false)
                return nextDate
              })
            }}
          >
            <MdArrowUpward />
          </button>
          <button
            type="button"
            className="button item selectable"
            onClick={(): void => {
              setDate((prevDate) => {
                const nextDate = addMonths(prevDate, 1)
                dispatch({
                  payload: nextDate
                })
                setTitle(format(nextDate, 'LLLL yyyy'))
                setFocusable(false)
                return nextDate
              })
            }}
          >
            <MdArrowDownward />
          </button>
        </div>
      </div>
      <div id="calendar-header" className="flex-row-container">
        {datesList.slice(0, 7).map((day) => (
          <div
            key={`calendar-header-${day.toDateString()}`}
            className="flex-row-item item"
          >
            {format(day, 'iiiii')}
          </div>
        ))}
      </div>
      <div id="calendar-dates" className="flex-row-container">
        {datesList.map((dateEl, index) => (
          <div
            key={`calendar-dates-${dateEl.toDateString()}`}
            className="flex-row-item item"
          >
            <Button
              id={`calendar-date-button-${index}`}
              type="button"
              className={cx(
                { focusable },
                selectedDate && isEqual(selectedDate, dateEl)
                  ? 'active'
                  : 'selectable',
                date.getMonth() !== dateEl.getMonth() ? 'wiped-out' : null
              )}
              onClick={(): void => {
                setDate(() => {
                  setSelectedDate(dateEl)
                  setFocusable(false)
                  const index = datesList.findIndex((d) => isEqual(d, dateEl))
                  if (index <= 0 || index >= (datesList.length - 1)) {
                    dispatch({
                      payload: dateEl
                    })
                  }
                  return dateEl
                })
                if (onClick) {
                  onClick(dateEl)
                }
              }}
            >
              {dateEl.getDate()}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
