import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {
  prepareAppointmentDateElement,
  prepareAppointmentsMap
} from './appointmentUtilities'
import {
  determineFirstAvailableDay,
  setOnMondayIfIsWeekend
} from './dateUtilties'

configure({ adapter: new Adapter() })

const currentDatePlusOneDay = determineFirstAvailableDay()

const currentDatePlusTwoMonths = setOnMondayIfIsWeekend(
  new Date(new Date().setDate(new Date().getDate() + 60))
)

const EXPECTED_FIRST_RESERVED_DATE = {
  id: '10' + currentDatePlusOneDay.toLocaleDateString(),
  hour: 10,
  day: currentDatePlusOneDay.getDate(),
  month: currentDatePlusOneDay.getMonth(),
  year: currentDatePlusOneDay.getFullYear(),
  date: currentDatePlusOneDay.toLocaleDateString(),
  isReserved: true
}

const EXPECTED_SECOND_RESERVED_DATE = {
  id: '10' + currentDatePlusTwoMonths.toLocaleDateString(),
  hour: 10,
  day: currentDatePlusTwoMonths.getDate(),
  month: currentDatePlusTwoMonths.getMonth(),
  year: currentDatePlusTwoMonths.getFullYear(),
  date: currentDatePlusTwoMonths.toLocaleDateString(),
  isReserved: true
}

describe('Appointment utilities unit tests', () => {
  it('should prepare appointment date element', () => {
    // given
    const currentDate = new Date()
    const currentHour = currentDate.getHours()
    const expectedFormattedHour = currentHour + ':00'
    const expectedFormattedDate = currentDate.toLocaleDateString()

    // when
    const actualAppointmentDateElement = mount(
      prepareAppointmentDateElement(
        currentDate.toLocaleDateString(),
        currentHour
      )
    )

    // then
    expect(actualAppointmentDateElement.find('h6').text()).toBe(
      expectedFormattedHour
    )
    expect(actualAppointmentDateElement.find('h5').text()).toBe(
      expectedFormattedDate
    )
  })

  it('should prepare map of appointments', () => {
    // given
    const reservedAppointments = [
      EXPECTED_FIRST_RESERVED_DATE,
      EXPECTED_SECOND_RESERVED_DATE
    ]

    // when
    const actualAppointmentsMap = prepareAppointmentsMap(reservedAppointments)

    // then
    const actualFirstDay =
      actualAppointmentsMap[currentDatePlusOneDay.toLocaleDateString()]
    expect(actualFirstDay).toHaveLength(12)
    expect(actualFirstDay).toContainEqual(EXPECTED_FIRST_RESERVED_DATE)

    const actualFirstDayPlusTwoMonths =
      actualAppointmentsMap[currentDatePlusTwoMonths.toLocaleDateString()]
    expect(actualFirstDayPlusTwoMonths).toHaveLength(12)
    expect(actualFirstDayPlusTwoMonths).toContainEqual(
      EXPECTED_SECOND_RESERVED_DATE
    )
  })
})
