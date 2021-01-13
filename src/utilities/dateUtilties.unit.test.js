import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {
  collectDates,
  setOnMondayIfIsWeekend,
  collectOnlyCurrentProcessedDayDates,
  dateIsToday
} from './dateUtilties'
import { Appointment } from '../data/dataStructures/Appointment'
import { INTERNAL_MEDICINE_CONSULTATION } from '../data/constants/AppointmentCausesConstants'

configure({ adapter: new Adapter() })

const buildAppointment = date => {
  const dateInLocalDateFormat = date.toLocaleDateString()
  const appointment = new Appointment()
  appointment.setId(10 + dateInLocalDateFormat)
  appointment.setHour(10)
  appointment.setDay(date.getDate())
  appointment.setMonth(date.getMonth())
  appointment.setYear(date.getFullYear())
  appointment.setDate(dateInLocalDateFormat)
  appointment.setIsReserved(true)
  appointment.setSelectedAppointmentCause(INTERNAL_MEDICINE_CONSULTATION)
  return appointment
}

describe('Appointment utilities unit tests', () => {
  it('should collect dates', () => {
    // given
    const currentDate = new Date()
    const nextDay = new Date(currentDate.setDate(currentDate.getDate() + 1))

    const firstAppointment = buildAppointment(currentDate)
    const secondAppointment = buildAppointment(nextDay)

    const expectedFirstDate = new Date(
      firstAppointment.year,
      firstAppointment.month,
      firstAppointment.day,
      firstAppointment.hour
    )
    const expectedSecondDate = new Date(
      secondAppointment.year,
      secondAppointment.month,
      secondAppointment.day,
      secondAppointment.hour
    )

    // when
    const actualDates = collectDates([firstAppointment, secondAppointment])

    // then
    expect(actualDates).toHaveLength(2)
    expect(actualDates).toContainEqual(expectedFirstDate)
    expect(actualDates).toContainEqual(expectedSecondDate)
  })

  it('should determine set monday when it is saturday', () => {
    // given
    const date = new Date(2021, 0, 16, 19, 1, 0, 0)
    const expectedDate = new Date(2021, 0, 18, 0, 1, 0, 0)

    // when
    const actualDate = setOnMondayIfIsWeekend(date)

    // then
    expect(actualDate.toLocaleDateString()).toBe(
      expectedDate.toLocaleDateString()
    )
    expect(actualDate.getDate()).toBe(expectedDate.getDate())
    expect(actualDate.getHours()).toBe(expectedDate.getHours())
  })

  it('should determine set monday with midnight hour when it is sunday', () => {
    // given
    const date = new Date(2021, 0, 17, 19, 1, 0, 0)
    const expectedDate = new Date(2021, 0, 18, 0, 1, 0, 0)

    // when
    const actualDate = setOnMondayIfIsWeekend(date)

    // then
    expect(actualDate.toLocaleDateString()).toBe(
      expectedDate.toLocaleDateString()
    )
    expect(actualDate.getDate()).toBe(expectedDate.getDate())
    expect(actualDate.getHours()).toBe(expectedDate.getHours())
  })

  it('should collect dates for specific day', () => {
    // given
    const currentDate = new Date(2021, 0, 13, 8, 0, 0, 0)
    const dateToBeFilteredOut = new Date(2021, 0, 12, 23, 0, 0, 0)
    const dateToBeFilteredOut2 = new Date(2021, 0, 14, 1, 0, 0, 0)
    const expectedDateWith18Hour = new Date(2021, 0, 13, 18, 0, 0, 0)
    const expectedDateWith19Hour = new Date(2021, 0, 13, 19, 0, 0, 0)
    const datesToBeFiltered = [
      dateToBeFilteredOut,
      dateToBeFilteredOut2,
      expectedDateWith18Hour,
      expectedDateWith19Hour
    ]

    // when
    const actualDates = collectOnlyCurrentProcessedDayDates(
      datesToBeFiltered,
      currentDate
    )

    // then
    expect(actualDates).toHaveLength(2)
    expect(actualDates).toContainEqual(expectedDateWith18Hour)
    expect(actualDates).toContainEqual(expectedDateWith19Hour)
  })

  it('should return true as the provided date is today', () => {
    // given
    const currentDate = new Date()

    // when
    const actualIsProvidedDateTheTodayDate = dateIsToday(currentDate)

    // then
    expect(actualIsProvidedDateTheTodayDate).toBe(true)
  })

  it('should return false as the provided date is today', () => {
    // given
    const currentDate = new Date(new Date().setDate(new Date().getDate() + 1))

    // when
    const actualIsProvidedDateTheTodayDate = dateIsToday(currentDate)

    // then
    expect(actualIsProvidedDateTheTodayDate).toBe(false)
  })
})
