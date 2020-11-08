import React from 'react'

export const prepareAppointmentTerm = selectedDate => {
  return (
    <div>
      <h6>{selectedDate.hour}:00</h6>
      <h5>{selectedDate.date}</h5>
    </div>
  )
}

export const prepareAppointmentsMap = (daysRange, reservedDates) => {
  let appointsmentsMap = {}
  const alreadySelectedDates = collectDates(reservedDates)
  const openingHours = {
    openingHour: 8,
    closingHour: 20
  }
  let curDate = new Date()
  curDate.setHours(openingHours.openingHour - 1)
  const actualSelectedDates = filterOutPreviousSelectedDates(
    alreadySelectedDates,
    curDate
  )
  for (let currentDay = 0; currentDay < daysRange; currentDay++) {
    curDate = new Date()
    curDate.setDate(curDate.getDate() + currentDay)
    const reservedDatesInCurrentDay = collectOnlyCurrentProcessedDayReservedDates(
      actualSelectedDates,
      curDate
    )
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
    const isHourReserved = isCurrentHourReserved(
      currentHour,
      reservedDatesInCurrentDay
    )
    const date = {
      id: currentHour + dateInLocalDateFormat,
      year: curDate.getFullYear(),
      month: curDate.getMonth(),
      day: curDate.getDate(),
      date: dateInLocalDateFormat,
      hour: currentHour,
      isReserved: isHourReserved
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
