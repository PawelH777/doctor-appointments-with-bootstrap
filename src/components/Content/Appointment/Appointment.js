import React from 'react'

import ListItem from '../../UI/ListItem/ListItem'
import Selector from '../../UI/Selector/Selector'
import classes from './Appointment.module.css'

const appointment = props => {
  let appointmentCauseElement
  let buttonElement
  const appointmentClasses = []

  if (props.editMode) {
    appointmentCauseElement = (
      <Selector
        disabled={props.isSelectorDisabled}
        appointmentCauses={props.appointmentCauses}
        selectedAppointmentCause={props.selectedAppointmentCause}
        appointmentCauseChanged={props.appointmentCauseChanged}
      />
    )
    buttonElement = (
      <div className={classes.Controls + ' d-flex align-items-center'}>
        <button
          type='button'
          className='btn btn-danger w-50 h-25'
          onClick={props.removeReservedAppointment}
        >
          REMOVE
        </button>
      </div>
    )
    appointmentClasses.push(classes.Appointment)
    appointmentClasses.push('float-left')
  } else {
    appointmentCauseElement = (
      <div>
        <label htmlFor='cause'>Chosen appointment's cause</label>
        <h6>{props.selectedAppointmentCause}</h6>
      </div>
    )
    appointmentClasses.push('w-100')
  }

  return (
    <div className={classes.AppointmentItem}>
      <div className={appointmentClasses.join(' ')}>
        <ListItem
          isButton={false}
          primary={props.appointmentTerm}
          secondary={'Reserved'}
          paperCss={classes.Paper}
        />
        {appointmentCauseElement}
      </div>
      {buttonElement}
    </div>
  )
}

export default appointment
