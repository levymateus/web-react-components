export interface CalendarProps {
  /**
   * The optional default start date. default value is now date.
   */
  defaultValue?: Date

  /**
   * The optional on change handler callback fired when an date is changed.
   * @param date - The selected date.
   */
  onChange?: (date: Date) => void
}
