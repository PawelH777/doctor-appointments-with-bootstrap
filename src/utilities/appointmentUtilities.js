import React from 'react'

import {
  collectDates,
  determineFirstAvailableDay,
  setOnMondayIfIsWeekend,
  collectOnlyCurrentProcessedDayDates,
  dateIsToday
} from './dateUtilties'
import * as datesConstants from '../data/constants/DatesRelatedConstants'
import { Appointment } from '../data/dataStructures/Appointment'

const OPENING_HOURS = {
  openingHour: datesConstants.OPENING_HOUR,
  closingHour: datesConstants.CLOSING_HOUR
}

export const prepareAppointmentDateElement = (date, hour) => {
  return (
    <div>
      <h6>{hour}:00</h6>
      <h5>{date}</h5>
    </div>
  )
}

export const prepareAppointmentsMap = reservedAppointments => {
  const alreadyReservedDates = collectDates(reservedAppointments)
  let curDate = determineFirstAvailableDay()
  const actualReservedDates = alreadyReservedDates.filter(
    selectedDate => selectedDate >= curDate
  )
  let appointmentsMap = {
    [curDate.toLocaleDateString()]: buildAppointmentsForCurrentDay(
      curDate,
      actualReservedDates,
      true
    )
  }
  for (
    let currentDay = 1;
    currentDay < datesConstants.DAYS_RANGE;
    currentDay++
  ) {
    curDate.setDate(curDate.getDate() + 1)
    curDate = setOnMondayIfIsWeekend(curDate)
    appointmentsMap = {
      ...appointmentsMap,
      [curDate.toLocaleDateString()]: buildAppointmentsForCurrentDay(
        curDate,
        actualReservedDates,
        false
      )
    }
  }
  return appointmentsMap
}

const buildAppointmentsForCurrentDay = (
  curDate,
  actualReservedDates,
  isStartingDay
) => {
  const reservedDatesInCurrentDay = collectOnlyCurrentProcessedDayDates(
    actualReservedDates,
    curDate
  )
  const appointments = []
  for (
    let currentHour = OPENING_HOURS.openingHour;
    currentHour < OPENING_HOURS.closingHour;
    currentHour++
  ) {
    const shouldBeReserved = shouldBeAppointmentReserved(
      currentHour,
      reservedDatesInCurrentDay,
      curDate,
      isStartingDay
    )
    const appointment = buildAppointment(curDate, currentHour, shouldBeReserved)
    appointments.push(appointment)
  }
  return appointments
}

const buildAppointment = (currentDate, currentHour, shouldBeReserved) => {
  const dateInLocalDateFormat = currentDate.toLocaleDateString()
  const appointment = new Appointment()
  appointment.setId(currentHour + dateInLocalDateFormat)
  appointment.setHour(currentHour)
  appointment.setDay(currentDate.getDate())
  appointment.setMonth(currentDate.getMonth())
  appointment.setYear(currentDate.getFullYear())
  appointment.setDate(dateInLocalDateFormat)
  appointment.setIsReserved(shouldBeReserved)
  return appointment
}

const shouldBeAppointmentReserved = (
  currentHour,
  reservedDatesInCurrentDay,
  curDate,
  isStartingDay
) => {
  if (isStartingDay) {
    return isCurrentHourAvailable(
      currentHour,
      reservedDatesInCurrentDay,
      curDate
    )
  } else {
    return isCurrentHourReserved(currentHour, reservedDatesInCurrentDay)
  }
}

const isCurrentHourAvailable = (hour, selectedDates, currentDate) => {
  if (!dateIsToday(currentDate) || hour > currentDate.getHours()) {
    return isCurrentHourReserved(hour, selectedDates)
  }
  return true
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
