import { cx } from '@emotion/css'
import { useHotkey } from '@wrc/utils/hooks'
import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import format from 'date-fns/format'
import isValid from 'date-fns/isValid'
import subDays from 'date-fns/subDays'
import subMonths from 'date-fns/subMonths'
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md'
import { StateReducer } from './contants'
import { focus, isEqual } from './utils'
import { Button, styles } from './Calendar.style'
import { CalendarProps } from './Calendar.types'
import { reducer, initializer } from './utils'

/**
 * A full custom uncontrollable calendar react component.
 */
export const Calendar: React.FC<CalendarProps> = ({
  defaultValue = new Date(),
  onChange
}: CalendarProps) => {
  const [date, setDate] = useState(() => {
    if (defaultValue && isValid(defaultValue)) {
      return defaultValue
    }
    return new Date()
  })
  const [title, setTitle] = useState(format(date, 'LLLL yyyy'))
  const [subtitle] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(date)
  const [focusable, setFocusable] = useState(false)
  const [datesList, dispatch] = useReducer<StateReducer<Date[], string>, Date>(
    reducer,
    date,
    initializer
  )

  useHotkey(() => console.log('test'), { ref: document, hotkey: { key: 'A' }})

  const handleKeyDown = useCallback(
    (evt: Event): void => {
      const { key } = evt as KeyboardEvent
      setFocusable(true)
      switch (key) {
        case 'ArrowLeft':
          setDate((prevDate : Date) => {
            const nextDate = subDays(prevDate, 1)
            const index = datesList.findIndex((date : Date) =>
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
          setDate((prevDate : Date) => {
            const nextDate = addDays(prevDate, 1)
            const index = datesList.findIndex((date : Date) =>
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
          setDate((prevDate : Date) => {
            const nextDate = subDays(prevDate, 7)
            const index = datesList.findIndex((date : Date) =>
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
          setDate((prevDate : Date) => {
            const nextDate = addDays(prevDate, 7)
            const index = datesList.findIndex((date : Date) =>
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

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return (): void => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  useEffect(() => {
    const index = datesList.findIndex((d : Date) =>
      isEqual(d, date)
    )
    focus(index)
  }, [date])

  return (
    <div className={styles}>
      <div id="calendar-nav" className="flex-row-full">
        <div id="calendar-nav-title" className="flex-row-item">
          <div id="calendar-title">{title}</div>
          <div id="calendar-title">{subtitle}</div>
        </div>
        <div className="flex-row-item">
          <button
            type="button"
            className="button item selectable"
            onClick={(): void => {
              setDate((prevDate : Date) => {
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
              setDate((prevDate : Date) => {
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
        {datesList.slice(0, 7).map((day : Date) => (
          <div
            key={`calendar-header-${day.toDateString()}`}
            className="flex-row-item item"
          >
            {format(day, 'iiiii')}
          </div>
        ))}
      </div>
      <div id="calendar-dates" className="flex-row-container">
        {datesList.map((dateEl : Date, index : number) => (
          <div
            key={`calendar-dates-${dateEl.toDateString()}`}
            className="flex-row-item item"
          >
            <Button
              id={`calendar-date-button-${index}`}
              data-testid={`calendar-date-button-${index}`}
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
                  const index = datesList.findIndex((d : Date) => isEqual(d, dateEl))
                  if (index <= 0 || index >= (datesList.length - 1)) {
                    dispatch({
                      payload: dateEl
                    })
                  }
                  return dateEl
                })
                if (onChange) {
                  onChange(dateEl)
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

export default Calendar
