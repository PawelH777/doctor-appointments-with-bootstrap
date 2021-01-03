import * as datesConstants from '../data/constants/DatesRelatedConstants'

export const collectDates = reservedAppointments => {
  let reservedDates = []
  reservedAppointments.forEach(reservedDate => {
    const reservedDateDateTime = new Date(
      reservedDate.year,
      reservedDate.month,
      reservedDate.day,
      reservedDate.hour
    )
    reservedDates.push(reservedDateDateTime)
  })
  return reservedDates
}

export const determineFirstAvailableDay = () => {
  let curDate = new Date()
  if (curDate.getHours() >= datesConstants.CLOSING_HOUR) {
    curDate = addDaysToDateWithMidnightAsHour(curDate, 1)
  }
  return setOnMondayIfIsWeekend(curDate)
}

export const setOnMondayIfIsWeekend = currentDate => {
  if (currentDate.getDay() === 0) {
    return addDaysToDateWithMidnightAsHour(currentDate, 1)
  } else if (currentDate.getDay() === 6) {
    return addDaysToDateWithMidnightAsHour(currentDate, 2)
  }
  return currentDate
}

const addDaysToDateWithMidnightAsHour = (date, daysToBeAdded) => {
  return new Date(
    new Date(date.setDate(date.getDate() + daysToBeAdded)).setHours(0)
  )
}

export const collectOnlyCurrentProcessedDayDates = (selectedDates, curDate) => {
  return selectedDates.filter(
    selectedDate =>
      selectedDate.getFullYear() === curDate.getFullYear() &&
      selectedDate.getMonth() === curDate.getMonth() &&
      selectedDate.getDate() === curDate.getDate()
  )
}

export const findLastAvailableDate = () => {
  let curDate = determineFirstAvailableDay()
  for (
    let currentDay = 1;
    currentDay < datesConstants.DAYS_RANGE;
    currentDay++
  ) {
    curDate.setDate(curDate.getDate() + 1)
    curDate = setOnMondayIfIsWeekend(curDate)
  }
  return curDate
}
export const dateIsToday = date => {
  const today = new Date()
  return date.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)
}
