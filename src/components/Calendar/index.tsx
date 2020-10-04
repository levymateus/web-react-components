/* eslint-disable react/require-default-props */
import React, { useEffect, useCallback, useReducer, useState } from "react"
import { MdArrowUpward, MdArrowDownward } from "react-icons/md"
import clsx from 'clsx'

import * as datefns from "date-fns"
import * as reducer from "./reducer"
import { StateReducer } from "./contants"

import "./index.css"

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

export const Calendar: React.FC<Props> = ({
	defaultValue = new Date(),
	onClick,
}: Props) => {
	const [targetDate, setTargetDate] = useState(defaultValue)
	const [title, setTitle] = useState(
		datefns.format(targetDate, 'LLLL yyyy')
	)
	const [selectedDate, setSelectedDate] = useState<Date | null>(targetDate);
	const [focusable, setFocusable] = useState(false);
	const [datesList, dispatch] = useReducer<StateReducer<Date[], string>, Date>(
		reducer.dates.default,
		targetDate,
		reducer.dates.initializer
	)

	const handleKeyDown = useCallback(
		(event: KeyboardEvent): void => {
			setFocusable(true);
			switch (event.key) {
				case "ArrowLeft":
					setTargetDate((prevDate) => {
						const nextDate = datefns.subDays(prevDate, 1);
						setTitle(datefns.format(nextDate, "LLLL yyyy"));
						const focusedIndex = datesList.findIndex((date) =>
							datefns.isEqual(date, nextDate)
						);
						focus(focusedIndex);
						return nextDate;
					});
					break;
				case "ArrowRight":
					setTargetDate((prevDate) => {
						const nextDate = datefns.addDays(prevDate, 1);
						setTitle(datefns.format(nextDate, "LLLL yyyy"));
						const focusedIndex = datesList.findIndex((date) =>
							datefns.isEqual(date, nextDate)
						);
						focus(focusedIndex);
						return nextDate;
					});
					break;
				case "ArrowUp":
					setTargetDate((prevDate) => {
						const nextDate = datefns.subDays(prevDate, 7);
						setTitle(datefns.format(nextDate, "LLLL yyyy"));
						const focusedIndex = datesList.findIndex((date) =>
							datefns.isEqual(date, nextDate)
						);
						focus(focusedIndex);
						return nextDate;
					});
					break;
				case "ArrowDown":
					setTargetDate((prevDate) => {
						const nextDate = datefns.addDays(prevDate, 7);
						setTitle(datefns.format(nextDate, "LLLL yyyy"));
						const focusedIndex = datesList.findIndex((date) =>
							datefns.isEqual(date, nextDate)
						);
						focus(focusedIndex);
						return nextDate;
					});
					break;
				default:
			}
		},
		[datesList]
	);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return (): void => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]);

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
								const nextDate = datefns.subMonths(prevDate, 1);
								dispatch({
									payload: nextDate,
								});
								setTitle(datefns.format(nextDate, "LLLL yyyy"));
								setFocusable(false);
								return nextDate;
							});
						}}
					>
						<MdArrowUpward />
					</button>
					<button
						type="button"
						className="button item selectable"
						onClick={(): void => {
							setTargetDate((prevDate) => {
								const nextDate = datefns.addMonths(prevDate, 1);
								dispatch({
									payload: nextDate,
								});
								setTitle(datefns.format(nextDate, "LLLL yyyy"));
								setFocusable(false);
								return nextDate;
							});
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
						{datefns.format(day, 'iiiii')}
					</div>
				))}
			</div>
			<div id="calendar-dates" className="flex-row-container">
				{datesList.map((nextDate, index) => (
					<div
						key={`calendar-dates-${nextDate.toDateString()}`}
						className="flex-row-item item"
					>
						<button
							id={`calendar-date-button-${index}`}
							type="button"
							className={clsx(
								"button",
								"item",
								{ focusable },
								selectedDate && datefns.isEqual(selectedDate, nextDate)
									? "active"
									: "selectable"
							)}
							onClick={(): void => {
								setTargetDate(() => {
									dispatch({
										payload: nextDate,
									});
									setTitle(datefns.format(nextDate, "LLLL yyyy"));
									setSelectedDate(nextDate);
									setFocusable(false);
									return nextDate;
								});
								if (onClick) {
									onClick(nextDate);
								}
							}}
						>
							{nextDate.getDate()}
						</button>
					</div>
				))}
			</div>
		</div>
	);
};