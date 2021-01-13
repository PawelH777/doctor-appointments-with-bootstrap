import React from 'react'
import { Provider } from 'react-redux'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'

import Appointments from './Appointments'
import AppointmentCard from '../../../components/AppointmentCard/AppointmentCard'
import Appointment from '../../../components/Appointment/Appointment'
import {
  INTERNAL_MEDICINE_CONSULTATION,
  FAMILY_DOCTOR_CONSULTATION,
  ONLINE_CONSULTATION
} from '../../../data/constants/AppointmentCausesConstants'
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

const currentDatePlusOneDay = new Date(
  new Date().setDate(new Date().getDate() + 1)
)

const currentDatePlusOneMonth = new Date(
  new Date().setDate(new Date().getDate() + 30)
)

const currentDateMinusOneDay = new Date(
  new Date().setDate(new Date().getDate() - 1)
)

const EXPECTED_FIRST_RESERVED_DATE = {
  id: '1' + currentDatePlusOneDay.toLocaleDateString(),
  hour: 10,
  day: currentDatePlusOneDay.getDate(),
  month: currentDatePlusOneDay.getMonth(),
  year: currentDatePlusOneDay.getFullYear(),
  date: currentDatePlusOneDay.toLocaleDateString(),
  isReserved: true,
  selectedAppointmentCause: INTERNAL_MEDICINE_CONSULTATION
}

const EXPECTED_SECOND_RESERVED_DATE = {
  id: '1' + currentDatePlusOneDay.toLocaleDateString(),
  hour: 11,
  day: currentDatePlusOneDay.getDate(),
  month: currentDatePlusOneDay.getMonth(),
  year: currentDatePlusOneDay.getFullYear(),
  date: currentDatePlusOneDay.toLocaleDateString(),
  isReserved: true,
  selectedAppointmentCause: FAMILY_DOCTOR_CONSULTATION
}

const EXPECTED_THIRD_RESERVED_DATE = {
  id: '2' + currentDatePlusOneMonth.toLocaleDateString(),
  hour: 10,
  day: currentDatePlusOneMonth.getDate(),
  month: currentDatePlusOneMonth.getMonth(),
  year: currentDatePlusOneMonth.getFullYear(),
  date: currentDatePlusOneMonth.toLocaleDateString(),
  isReserved: true,
  selectedAppointmentCause: ONLINE_CONSULTATION
}

const EXPECTED_FOURTH_RESERVED_DATE = {
  id: '1' + currentDateMinusOneDay.toLocaleDateString(),
  hour: 10,
  day: currentDateMinusOneDay.getDate(),
  month: currentDateMinusOneDay.getMonth(),
  year: currentDateMinusOneDay.getFullYear(),
  date: currentDateMinusOneDay.toLocaleDateString(),
  isReserved: true,
  selectedAppointmentCause: INTERNAL_MEDICINE_CONSULTATION
}

const EXPECTED_FIFTH_RESERVED_DATE = {
  id: '1' + currentDateMinusOneDay.toLocaleDateString(),
  hour: 11,
  day: currentDateMinusOneDay.getDate(),
  month: currentDateMinusOneDay.getMonth(),
  year: currentDateMinusOneDay.getFullYear(),
  date: currentDateMinusOneDay.toLocaleDateString(),
  isReserved: true,
  selectedAppointmentCause: INTERNAL_MEDICINE_CONSULTATION
}

const EXPECTED_FIRST_APPOINTMENT_ID = 'first'
const EXPECTED_SECOND_APPOINTMENT_ID = 'second'

const EXPECTED_WRAPPER_TEXT_WHEN_NO_APPOINTMENTS =
  'No appointments! Please make a new one to view it there.'

const EXPECTED_WRAPPER_TEXT_WHEN_IS_LOADING = 'Loading...'

describe('<Appointments /> unit tests', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should render appointments', async () => {
    // given
    const mockResponse = {
      data: {
        first: {
          patientInformation: EXPECTED_PATIENT_INFO,
          reservedAppointments: {
            0: EXPECTED_FIRST_RESERVED_DATE
          }
        },
        second: {
          patientInformation: EXPECTED_PATIENT_INFO,
          reservedAppointments: [
            EXPECTED_SECOND_RESERVED_DATE,
            EXPECTED_THIRD_RESERVED_DATE
          ]
        }
      }
    }
    axios.get.mockImplementation(() => Promise.resolve(mockResponse))

    // when
    const wrapper = mount(
      <Provider store={store}>
        <Appointments />
      </Provider>
    )
    await wrapper.update()
    wrapper.update()

    // then
    const actualAppointmentCardElement = wrapper.find(AppointmentCard)
    expect(actualAppointmentCardElement).toHaveLength(2)

    // First Appointment Card
    const actualFirstAppointmentCardElement = actualAppointmentCardElement.filterWhere(
      appointmentCard =>
        appointmentCard.prop('appointmentId') === EXPECTED_FIRST_APPOINTMENT_ID
    )
    expect(actualFirstAppointmentCardElement).toHaveLength(1)
    expect(actualFirstAppointmentCardElement.prop('appointmentId')).toBe(
      EXPECTED_FIRST_APPOINTMENT_ID
    )
    expect(actualFirstAppointmentCardElement.prop('patientInfo')).toBe(
      EXPECTED_PATIENT_INFO
    )
    expect(
      actualFirstAppointmentCardElement.prop('appointmentElements')
    ).toBeDefined()
    expect(
      actualFirstAppointmentCardElement.prop('removeReservation')
    ).toBeDefined()

    // First Appointment from first Appointment Card
    const actualFirstAppointmentFromFirstCardElement = actualFirstAppointmentCardElement.find(
      Appointment
    )
    expect(actualFirstAppointmentFromFirstCardElement).toHaveLength(1)
    expect(actualFirstAppointmentFromFirstCardElement.prop('editMode')).toBe(
      false
    )
    expect(
      actualFirstAppointmentFromFirstCardElement.prop(
        'selectedAppointmentCause'
      )
    ).toBe(INTERNAL_MEDICINE_CONSULTATION)
    expect(
      actualFirstAppointmentFromFirstCardElement.prop('appointmentTerm')
    ).toBeDefined()

    // Second Appointment Card
    const actualSecondAppointmentCardElement = actualAppointmentCardElement.filterWhere(
      appointmentCard =>
        appointmentCard.prop('appointmentId') === EXPECTED_SECOND_APPOINTMENT_ID
    )
    expect(actualSecondAppointmentCardElement).toHaveLength(1)
    expect(actualSecondAppointmentCardElement.prop('appointmentId')).toBe(
      EXPECTED_SECOND_APPOINTMENT_ID
    )
    expect(actualSecondAppointmentCardElement.prop('patientInfo')).toBe(
      EXPECTED_PATIENT_INFO
    )
    expect(
      actualSecondAppointmentCardElement.prop('appointmentElements')
    ).toBeDefined()
    expect(
      actualSecondAppointmentCardElement.prop('removeReservation')
    ).toBeDefined()

    // Appointments from second Appointment Card
    const actualAppointmentsFromSecondCardElement = actualSecondAppointmentCardElement.find(
      Appointment
    )
    expect(actualAppointmentsFromSecondCardElement).toHaveLength(2)
    const actualSelectedCausesFromSecondCard = []
    // Only selected appointment cause should be checked as the rest of the properties are the same as in case of the first appointment
    actualAppointmentsFromSecondCardElement.forEach(appointmentElement =>
      actualSelectedCausesFromSecondCard.push(
        appointmentElement.prop('selectedAppointmentCause')
      )
    )
    expect(actualSelectedCausesFromSecondCard).toContain(
      FAMILY_DOCTOR_CONSULTATION
    )
    expect(actualSelectedCausesFromSecondCard).toContain(ONLINE_CONSULTATION)
  })

  it('should render placeholder text because reserved dates are outdated', async () => {
    // given
    const mockResponse = {
      data: {
        first: {
          patientInformation: EXPECTED_PATIENT_INFO,
          reservedAppointments: {
            0: EXPECTED_FOURTH_RESERVED_DATE
          }
        },
        second: {
          patientInformation: EXPECTED_PATIENT_INFO,
          reservedAppointments: {
            0: EXPECTED_FIFTH_RESERVED_DATE
          }
        }
      }
    }
    axios.get.mockImplementation(() => Promise.resolve(mockResponse))

    // when
    const wrapper = mount(
      <Provider store={store}>
        <Appointments />
      </Provider>
    )
    await wrapper.update()
    wrapper.update()

    // then
    const actualAppointmentCardElement = wrapper.find(AppointmentCard)
    expect(actualAppointmentCardElement).toHaveLength(0)

    expect(wrapper.text()).toBe(EXPECTED_WRAPPER_TEXT_WHEN_NO_APPOINTMENTS)
  })

  it('should render spinner as the async code is not finished', async () => {
    // given
    const mockResponse = {
      data: {
        first: {
          patientInformation: EXPECTED_PATIENT_INFO,
          reservedAppointments: {
            0: EXPECTED_FOURTH_RESERVED_DATE
          }
        },
        second: {
          patientInformation: EXPECTED_PATIENT_INFO,
          reservedAppointments: {
            0: EXPECTED_FIFTH_RESERVED_DATE
          }
        }
      }
    }
    axios.get.mockImplementation(() => Promise.resolve(mockResponse))

    // when
    const wrapper = mount(
      <Provider store={store}>
        <Appointments />
      </Provider>
    )
    wrapper.update() // component contains async code that'll be executed after the assertions

    // then
    expect(wrapper.text()).toBe(EXPECTED_WRAPPER_TEXT_WHEN_IS_LOADING)
  })

  it('should remove appointments', async () => {
    // given
    const mockResponse = {
      data: {
        first: {
          patientInformation: EXPECTED_PATIENT_INFO,
          reservedAppointments: {
            0: EXPECTED_FIRST_RESERVED_DATE
          }
        },
        second: {
          patientInformation: EXPECTED_PATIENT_INFO,
          reservedAppointments: {
            0: EXPECTED_SECOND_RESERVED_DATE,
            1: EXPECTED_THIRD_RESERVED_DATE
          }
        }
      }
    }
    axios.get.mockImplementation(() => Promise.resolve(mockResponse))
    axios.delete.mockImplementation(() => Promise.resolve())

    // when
    const wrapper = mount(
      <Provider store={store}>
        <Appointments />
      </Provider>
    )
    await wrapper.update()
    wrapper.update()
    expect(wrapper.find(AppointmentCard)).toHaveLength(2)

    await wrapper
      .find(AppointmentCard)
      .filterWhere(
        appointmentCard => appointmentCard.prop('appointmentId') === 'first'
      )
      .find('button')
      .simulate('click')

    await wrapper
      .find(AppointmentCard)
      .filterWhere(
        appointmentCard => appointmentCard.prop('appointmentId') === 'second'
      )
      .find('button')
      .simulate('click')
    wrapper.update()

    // then
    expect(wrapper.find(AppointmentCard)).toHaveLength(0)
    expect(wrapper.text()).toBe(EXPECTED_WRAPPER_TEXT_WHEN_NO_APPOINTMENTS)
  })
})
