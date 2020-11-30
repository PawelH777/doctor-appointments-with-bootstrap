import React from 'react'

import * as datesConstants from '../data/constants/DatesRelatedConstants'

export const prepareAppointmentDateElement = (date, hour) => {
  return (
    <div>
      <h6>{hour}:00</h6>
      <h5>{date}</h5>
    </div>
  )
}

export const prepareAppointmentsMap = reservedDates => {
  const alreadySelectedDates = collectDates(reservedDates)
  let curDate = determineCurrentDay();
  const actualSelectedDates = filterOutPreviousSelectedDates(
    alreadySelectedDates, curDate
  )
  let appointsmentsMap = {}
  for (
    let currentDay = 0;
    currentDay < datesConstants.DAYS_RANGE;
    currentDay++
  ) {
    curDate.setDate(curDate.getDate() + currentDay)
    curDate = setOnMondayIfIsWeekend(curDate)
    const reservedDatesInCurrentDay = collectOnlyCurrentProcessedDayReservedDates(
      actualSelectedDates,
      curDate
    )
    const openingHours = {
      openingHour: datesConstants.OPENING_HOUR,
      closingHour: datesConstants.CLOSING_HOUR
    }
    const datesObjects = buildDatesForCurrentDay(
      curDate,
      openingHours,
      reservedDatesInCurrentDay
    )
    appointsmentsMap = {
      ...appointsmentsMap,
      [curDate.toLocaleDateString()]: datesObjects
    }
  }
  return appointsmentsMap
}

const collectDates = reservedDates => {
  let reservedDatesDateTimes = []
  reservedDates.forEach(reservedDate => {
    const reservedDateDateTime = new Date(
      reservedDate.year,
      reservedDate.month,
      reservedDate.day,
      reservedDate.hour
    )
    reservedDatesDateTimes.push(reservedDateDateTime)
  })
  return reservedDatesDateTimes
}

const determineCurrentDay = () => {
  let curDate = new Date()
  curDate = setNextDayIfIsDuringOrAfterClosingHour(curDate)
  return setOnMondayIfIsWeekend(curDate);
}

const setNextDayIfIsDuringOrAfterClosingHour = currentDate => {
  return currentDate.getHours() >= datesConstants.CLOSING_HOUR ? currentDate.setDate(currentDate.getDate() + 1) : currentDate
}

const setOnMondayIfIsWeekend = currentDate => {
  let date = currentDate.getDay() === 0 ? currentDate.setDate(currentDate.getDate() + 1) : currentDate
  return date.getDay() === 6 ? date.setDate(date.getDate() + 2) : date
}

const filterOutPreviousSelectedDates = (selectedDates, curDate) => {
  return selectedDates.filter(selectedDate => selectedDate >= curDate)
}

const collectOnlyCurrentProcessedDayReservedDates = (
  selectedDates,
  curDate
) => {
  return selectedDates.filter(
    selectedDate =>
      selectedDate.getFullYear() === curDate.getFullYear() &&
      selectedDate.getMonth() === curDate.getMonth() &&
      selectedDate.getDate() === curDate.getDate()
  )
}

const buildDatesForCurrentDay = (
  curDate,
  openingHours,
  reservedDatesInCurrentDay
) => {
  const dates = []
  const dateInLocalDateFormat = curDate.toLocaleDateString()
  for (
    let currentHour = openingHours.openingHour;
    currentHour < openingHours.closingHour;
    currentHour++
  ) {
    const date = {
      id: currentHour + dateInLocalDateFormat,
      year: curDate.getFullYear(),
      month: curDate.getMonth(),
      day: curDate.getDate(),
      date: dateInLocalDateFormat,
      hour: currentHour,
      isReserved: isCurrentHourReserved(currentHour, reservedDatesInCurrentDay)
    }
    dates.push(date)
  }
  return dates
}

const isCurrentHourReserved = (currentHour, reservedDates) => {
  let isReserved = false
  reservedDates.forEach(reservedDate => {
    if (reservedDate.getHours() === currentHour) {
      isReserved = true
    }
  })
  return isReserved
}
