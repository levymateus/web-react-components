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
