import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import ListItem from '@material-ui/core/ListItem'

import AppointmentsScheduler from './AppointmentsScheduler'
import TimeTable from '../../../components/TimeTable/TimeTable'
import ReservedAppointments from '../../../components/ReservedAppointments/ReservedAppointments'
import Spinner from '../../../components/Spinner/Spinner'
import {
  INTERNAL_MEDICINE_CONSULTATION,
  FAMILY_DOCTOR_CONSULTATION,
  ONLINE_CONSULTATION
} from '../../../data/constants/AppointmentCausesConstants'
import { determineFirstAvailableDay } from '../../../utilities/dateUtilties'
import axios from '../../../axios-doctor-appointments'

configure({ adapter: new Adapter() })

const configureMockStore = configureStore()

const initialState = {
  auth: {
    userId: 1,
    token: 'test token'
  }
}

const store = configureMockStore(initialState)

jest.mock('../../../axios-doctor-appointments')

const EXPECTED_PATIENT_INFO = {
  email: 'pawel.jan.hornik@gmail.com',
  lastName: 'Hornik',
  name: 'Paweł',
  number: '640645719'
}

const firstAvailableDay = determineFirstAvailableDay()
const currentDateWithHoursSetAt10 = new Date(firstAvailableDay.setHours(10))
const currentDateWithHoursSetAt11 = new Date(firstAvailableDay.setHours(11))
const currentDateWithHoursSetAt12 = new Date(firstAvailableDay.setHours(12))

const EXPECTED_FIRST_RESERVED_DATE = {
  date: currentDateWithHoursSetAt10.toLocaleDateString(),
  day: currentDateWithHoursSetAt10.getDate(),
  hour: 10,
  id: '10' + currentDateWithHoursSetAt10.toLocaleDateString(),
  isReserved: true,
  month: currentDateWithHoursSetAt10.getMonth(),
  year: currentDateWithHoursSetAt10.getFullYear()
}

const EXPECTED_FIRST_RESERVED_APPOINTMENT = {
  ...EXPECTED_FIRST_RESERVED_DATE,
  selectedAppointmentCause: INTERNAL_MEDICINE_CONSULTATION
}

const EXPECTED_SECOND_RESERVED_DATE = {
  date: currentDateWithHoursSetAt11.toLocaleDateString(),
  day: currentDateWithHoursSetAt11.getDate(),
  hour: 11,
  id: '11' + currentDateWithHoursSetAt11.toLocaleDateString(),
  isReserved: true,
  month: currentDateWithHoursSetAt11.getMonth(),
  year: currentDateWithHoursSetAt11.getFullYear()
}

const EXPECTED_SECOND_RESERVED_APPOINTMENT = {
  ...EXPECTED_SECOND_RESERVED_DATE,
  selectedAppointmentCause: FAMILY_DOCTOR_CONSULTATION
}

const EXPECTED_THIRD_RESERVED_DATE = {
  date: currentDateWithHoursSetAt12.toLocaleDateString(),
  day: currentDateWithHoursSetAt12.getDate(),
  hour: 12,
  id: '12' + currentDateWithHoursSetAt12.toLocaleDateString(),
  isReserved: true,
  month: currentDateWithHoursSetAt12.getMonth(),
  year: currentDateWithHoursSetAt12.getFullYear()
}

const EXPECTED_THIRD_RESERVED_APPOINTMENT = {
  ...EXPECTED_THIRD_RESERVED_DATE,
  selectedAppointmentCause: ONLINE_CONSULTATION
}

const EXPECTED_CAUSES = [
  INTERNAL_MEDICINE_CONSULTATION,
  FAMILY_DOCTOR_CONSULTATION,
  ONLINE_CONSULTATION
]

describe('<AppointmentsScheduler /> unit tests', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render scheduler when there are no reservations', async () => {
    // given
    const mockResponse = {
      data: {}
    }
    axios.get.mockImplementation(() => Promise.resolve(mockResponse))

    // when
    const wrapper = mount(
      <Provider store={store}>
        <AppointmentsScheduler />
      </Provider>
    )
    await wrapper.update()
    wrapper.update()

    // then
    const actualTimeTable = wrapper.find(TimeTable)
    expect(actualTimeTable).toHaveLength(1)
    expect(actualTimeTable.prop('listItemClicked')).toBeDefined()
    expect(actualTimeTable.prop('changed')).toBeDefined()
    expect(actualTimeTable.prop('actualDate')).toBeDefined()

    const actualAppointmentsInTimeTable = actualTimeTable.prop('appointments')
    expect(actualAppointmentsInTimeTable).toHaveLength(12)
  })

  it('should render scheduler when reservations was earlier made', async () => {
    // given
    const mockResponse = {
      data: {
        first: {
          patientInformation: EXPECTED_PATIENT_INFO,
          reservedAppointments: [EXPECTED_FIRST_RESERVED_APPOINTMENT]
        },
        second: {
          patientInformation: EXPECTED_PATIENT_INFO,
          reservedAppointments: [
            EXPECTED_SECOND_RESERVED_APPOINTMENT,
            EXPECTED_THIRD_RESERVED_APPOINTMENT
          ]
        }
      }
    }
    axios.get.mockImplementation(() => Promise.resolve(mockResponse))

    // when
    const wrapper = mount(
      <Provider store={store}>
        <AppointmentsScheduler />
      </Provider>
    )
    await wrapper.update()
    wrapper.update()

    // then
    const actualTimeTable = wrapper.find(TimeTable)
    expect(actualTimeTable).toHaveLength(1)
    expect(actualTimeTable.prop('listItemClicked')).toBeDefined()
    expect(actualTimeTable.prop('changed')).toBeDefined()
    expect(actualTimeTable.prop('actualDate')).toBeDefined()

    const actualAppointmentsInTimeTable = actualTimeTable.prop('appointments')
    expect(actualAppointmentsInTimeTable).toHaveLength(12)
    expect(actualAppointmentsInTimeTable).toContainEqual(
      EXPECTED_FIRST_RESERVED_DATE
    )
    expect(actualAppointmentsInTimeTable).toContainEqual(
      EXPECTED_SECOND_RESERVED_DATE
    )
    expect(actualAppointmentsInTimeTable).toContainEqual(
      EXPECTED_THIRD_RESERVED_DATE
    )
  })

  it('should add new reservations', async () => {
    // given
    const mockResponse = {
      data: {}
    }
    axios.get.mockImplementation(() => Promise.resolve(mockResponse))

    // when
    const wrapper = mount(
      <Router>
        <Provider store={store}>
          <AppointmentsScheduler />
        </Provider>
      </Router>
    )
    await wrapper.update()
    wrapper.update()
    wrapper
      .find(ListItem)
      .at(2)
      .simulate('click')
    wrapper
      .find(ListItem)
      .at(3)
      .simulate('click')

    // then
    const actualReservedAppointments = wrapper.find(ReservedAppointments)
    expect(actualReservedAppointments.prop('appointmentCauses')).toStrictEqual(
      EXPECTED_CAUSES
    )
    expect(
      actualReservedAppointments.prop('appointmentCauseChanged')
    ).toBeDefined()
    expect(
      actualReservedAppointments.prop('removeReservationClicked')
    ).toBeDefined()
    expect(actualReservedAppointments.prop('isUserLogged')).toBe(true)

    const actualReservationsProp = actualReservedAppointments.prop(
      'reservations'
    )
    expect(actualReservationsProp).toHaveLength(2)

    expect(actualReservationsProp[0].date).toBe(
      EXPECTED_FIRST_RESERVED_DATE.date
    )
    expect(actualReservationsProp[0].day).toBe(EXPECTED_FIRST_RESERVED_DATE.day)
    expect(actualReservationsProp[0].hour).toBe(
      EXPECTED_FIRST_RESERVED_DATE.hour
    )
    expect(actualReservationsProp[0].isReserved).toBe(
      EXPECTED_FIRST_RESERVED_DATE.isReserved
    )
    expect(actualReservationsProp[0].month).toBe(
      EXPECTED_FIRST_RESERVED_DATE.month
    )
    expect(actualReservationsProp[0].year).toBe(
      EXPECTED_FIRST_RESERVED_DATE.year
    )

    expect(actualReservationsProp[1].date).toBe(
      EXPECTED_SECOND_RESERVED_DATE.date
    )
    expect(actualReservationsProp[1].day).toBe(
      EXPECTED_SECOND_RESERVED_DATE.day
    )
    expect(actualReservationsProp[1].hour).toBe(
      EXPECTED_SECOND_RESERVED_DATE.hour
    )
    expect(actualReservationsProp[1].isReserved).toBe(
      EXPECTED_SECOND_RESERVED_DATE.isReserved
    )
    expect(actualReservationsProp[1].month).toBe(
      EXPECTED_SECOND_RESERVED_DATE.month
    )
    expect(actualReservationsProp[1].year).toBe(
      EXPECTED_SECOND_RESERVED_DATE.year
    )
  })

  it('should remove reservation', async () => {
    // given
    const mockResponse = {
      data: {}
    }
    axios.get.mockImplementation(() => Promise.resolve(mockResponse))

    // when
    const wrapper = mount(
      <Router>
        <Provider store={store}>
          <AppointmentsScheduler />
        </Provider>
      </Router>
    )
    await wrapper.update()
    wrapper.update()
    wrapper
      .find(ListItem)
      .at(0)
      .simulate('click')
    expect(wrapper.find(ReservedAppointments)).toHaveLength(1)

    wrapper.find('button.btn-danger').simulate('click')

    // then
    expect(wrapper.find(ReservedAppointments)).toHaveLength(0)
  })

  it('should show spinner when page is still loading', async () => {
    // given
    const mockResponse = {
      data: {}
    }
    axios.get.mockImplementation(() => Promise.resolve(mockResponse))

    // when
    const wrapper = mount(
      <Router>
        <Provider store={store}>
          <AppointmentsScheduler />
        </Provider>
      </Router>
    )

    // then
    expect(wrapper.find(Spinner)).toHaveLength(1)
    expect(wrapper.text()).toBe('Loading...')
  })
})
