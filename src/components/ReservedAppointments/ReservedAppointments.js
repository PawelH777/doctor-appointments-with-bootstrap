import React from 'react'
import Divider from '@material-ui/core/Divider'

import Appointment from '../Appointment/Appointment'
import DynamicReservationButton from '../DynamicReservationButton/DynamicReservationButton'
import { prepareAppointmentDateElement } from '../../utilities/appointmentUtilities'

const reservedAppointments = props => {
  const prepareReservationsElements = () => {
    let index = 0
    return props.reservations.map(reservation => {
      return (
        <Appointment
          key={index++}
          editMode={true}
          appointmentTerm={prepareAppointmentDateElement(
            reservation.date,
            reservation.hour
          )}
          appointmentCauses={props.appointmentCauses}
          selectedAppointmentCause={reservation.selectedAppointmentCause}
          appointmentCauseChanged={event =>
            props.appointmentCauseChanged(event, reservation)
          }
          removeReservedAppointment={() =>
            props.removeReservationClicked(reservation)
          }
        />
      )
    })
  }

  return (
    <div className='mt-5'>
      <Divider />
      {prepareReservationsElements()}
      <DynamicReservationButton
        reservedAppointments={props.reservations}
        isAuthenticated={props.isUserLogged}
      />
    </div>
  )
}

export default reservedAppointments
