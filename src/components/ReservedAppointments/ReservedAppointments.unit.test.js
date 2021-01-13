import React from 'react'
import Divider from '@material-ui/core/Divider'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import ReservedAppointments from './ReservedAppointments'
import AppointmentComponent from '../Appointment/Appointment'
import DynamicReservationButton from '../DynamicReservationButton/DynamicReservationButton'
import { Appointment } from '../../data/dataStructures/Appointment'
import * as causes from '../../data/constants/AppointmentCausesConstants'

configure({ adapter: new Adapter() })

const buildReservation = (id, hour, selectedCause) => {
  const currentDate = new Date()
  const dateInLocalDateFormat = currentDate.toLocaleDateString()
  const reservation = new Appointment()
  reservation.setId(id + dateInLocalDateFormat)
  reservation.setHour(hour)
  reservation.setDay(currentDate.getDate())
  reservation.setMonth(currentDate.getMonth())
  reservation.setYear(currentDate.getFullYear())
  reservation.setDate(dateInLocalDateFormat)
  reservation.setIsReserved(true)
  reservation.setSelectedAppointmentCause(selectedCause)
  return reservation
}

describe('<ReservedAppointments /> unit tests', () => {
  it('should render reserved appointments component', () => {
    // given

    // when
    const wrapper = shallow(
      <ReservedAppointments isUserLogged={true} reservations={[]} />
    )

    // then
    expect(wrapper.find(Divider)).toHaveLength(1)
    expect(wrapper.find(AppointmentComponent)).toHaveLength(0)

    const actualDynamicReservationButton = wrapper.find(
      DynamicReservationButton
    )
    expect(actualDynamicReservationButton).toHaveLength(1)
    expect(
      actualDynamicReservationButton.prop('reservedAppointments')
    ).toHaveLength(0)
    expect(actualDynamicReservationButton.prop('isAuthenticated')).toBe(true)
  })

  it('should render reserved appointments component with reservations', () => {
    // given
    const firstReservation = buildReservation(
      1,
      10,
      causes.INTERNAL_MEDICINE_CONSULTATION
    )
    const secondReservation = buildReservation(
      1,
      11,
      causes.FAMILY_DOCTOR_CONSULTATION
    )
    const expectedAppCauses = [
      causes.INTERNAL_MEDICINE_CONSULTATION,
      causes.FAMILY_DOCTOR_CONSULTATION,
      causes.ONLINE_CONSULTATION
    ]

    // when
    const wrapper = shallow(
      <ReservedAppointments
        isUserLogged={false}
        reservations={[firstReservation, secondReservation]}
        appointmentCauses={expectedAppCauses}
        appointmentCauseChanged={() => true}
        removeReservationClicked={() => true}
      />
    )

    // then
    expect(wrapper.find(Divider)).toHaveLength(1)

    const actualAppointments = wrapper.find(AppointmentComponent)
    expect(actualAppointments).toHaveLength(2)

    const actualFirstAppointment = actualAppointments.filterWhere(
      app =>
        app.prop('selectedAppointmentCause') ===
        causes.INTERNAL_MEDICINE_CONSULTATION
    )
    expect(actualFirstAppointment).toHaveLength(1)
    expect(actualFirstAppointment.prop('editMode')).toBe(true)
    expect(actualFirstAppointment.prop('appointmentTerm')).toBeDefined()
    expect(actualFirstAppointment.prop('appointmentCauses')).toBe(
      expectedAppCauses
    )
    expect(actualFirstAppointment.prop('selectedAppointmentCause')).toBe(
      causes.INTERNAL_MEDICINE_CONSULTATION
    )
    expect(actualFirstAppointment.prop('appointmentCauseChanged')).toBeDefined()
    expect(
      actualFirstAppointment.prop('removeReservedAppointment')
    ).toBeDefined()

    const actualSecondAppointment = actualAppointments.filterWhere(
      app =>
        app.prop('selectedAppointmentCause') ===
        causes.FAMILY_DOCTOR_CONSULTATION
    )
    expect(actualSecondAppointment).toHaveLength(1)
    expect(actualSecondAppointment.prop('editMode')).toBe(true)
    expect(actualSecondAppointment.prop('appointmentTerm')).toBeDefined()
    expect(actualSecondAppointment.prop('appointmentCauses')).toBe(
      expectedAppCauses
    )
    expect(actualSecondAppointment.prop('selectedAppointmentCause')).toBe(
      causes.FAMILY_DOCTOR_CONSULTATION
    )
    expect(
      actualSecondAppointment.prop('appointmentCauseChanged')
    ).toBeDefined()
    expect(
      actualSecondAppointment.prop('removeReservedAppointment')
    ).toBeDefined()

    const actualDynamicReservationButton = wrapper.find(
      DynamicReservationButton
    )
    expect(actualDynamicReservationButton).toHaveLength(1)
    expect(
      actualDynamicReservationButton.prop('reservedAppointments')
    ).toHaveLength(2)
    expect(actualDynamicReservationButton.prop('isAuthenticated')).toBe(false)
  })
})
