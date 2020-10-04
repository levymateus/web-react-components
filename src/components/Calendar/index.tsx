import React from 'react'
import { MdArrowUpward, MdArrowDownward } from 'react-icons/md'
import clsx from 'clsx'

import format from 'date-fns/format'
import subDays from 'date-fns/subDays'
import addDays from 'date-fns/addDays'
import subMonths from 'date-fns/subMonths'
import addMonths from 'date-fns/addMonths'

import * as reducer from './reducer'
import { StateReducer } from './contants'

import './index.css'

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
  const [targetDate, setTargetDate] = React.useState(defaultValue)
  const [title, setTitle] = React.useState(format(targetDate, 'LLLL yyyy'))
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(targetDate)
  const [focusable, setFocusable] = React.useState(false)
  const [datesList, dispatch] = React.useReducer<StateReducer<Date[], string>, Date>(
    reducer.reducer,
    targetDate,
    reducer.initializer
  )

  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent): void => {
      setFocusable(true)
      switch (event.key) {
        case 'ArrowLeft':
          setTargetDate((prevDate) => {
            const nextDate = subDays(prevDate, 1)
            setTitle(format(nextDate, 'LLLL yyyy'))
            const focusedIndex = datesList.findIndex((date) =>
              isEqual(date, nextDate)
            )
            focus(focusedIndex)
            return nextDate
          })
          break
        case 'ArrowRight':
          setTargetDate((prevDate) => {
            const nextDate = addDays(prevDate, 1)
            setTitle(format(nextDate, 'LLLL yyyy'))
            const focusedIndex = datesList.findIndex((date) =>
              isEqual(date, nextDate)
            )
            focus(focusedIndex)
            return nextDate
          })
          break
        case 'ArrowUp':
          setTargetDate((prevDate) => {
            const nextDate = subDays(prevDate, 7)
            setTitle(format(nextDate, 'LLLL yyyy'))
            const focusedIndex = datesList.findIndex((date) =>
              isEqual(date, nextDate)
            )
            focus(focusedIndex)
            return nextDate
          })
          break
        case 'ArrowDown':
          setTargetDate((prevDate) => {
            const nextDate = addDays(prevDate, 7)
            setTitle(format(nextDate, 'LLLL yyyy'))
            const focusedIndex = datesList.findIndex((date) =>
              isEqual(date, nextDate)
            )
            focus(focusedIndex)
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

  return (
    <div id="calendar">
      <div id="calendar-nav" className="flex-row-full">
        <div id="calendar-nav-title" className="flex-row-item">
          <div id="calendar-title">{title}</div>
        </div>
        <div className="flex-row-item">
          <button
            type="button"
            className="button item selectable"
            onClick={(): void => {
              setTargetDate((prevDate) => {
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
              setTargetDate((prevDate) => {
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
        {datesList.map((date, index) => (
          <div
            key={`calendar-dates-${date.toDateString()}`}
            className="flex-row-item item"
          >
            <button
              id={`calendar-date-button-${index}`}
              type="button"
              className={clsx(
                'button',
                'item',
                { focusable },
                selectedDate && isEqual(selectedDate, date)
                  ? 'active'
                  : 'selectable'
              )}
              onClick={(): void => {
                setTargetDate(() => {
                  dispatch({
                    payload: date
                  })
                  setTitle(format(date, 'LLLL yyyy'))
                  setSelectedDate(date)
                  setFocusable(false)
                  return date
                })
                if (onClick) {
                  onClick(date)
                }
              }}
            >
              {date.getDate()}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
