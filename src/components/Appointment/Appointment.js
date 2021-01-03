import React from 'react'

import ListItem from '../ListItem/ListItem'
import Selector from '../Selector/Selector'
import classes from './Appointment.module.css'

const appointment = props => {
  const createSelectorElement = () => {
    return (
      <Selector
        appointmentCauses={props.appointmentCauses}
        selectedAppointmentCause={props.selectedAppointmentCause}
        appointmentCauseChanged={props.appointmentCauseChanged}
      />
    )
  }

  const createButtonElement = styles => {
    return (
      <div className={styles}>
        <button
          type='button'
          className='btn btn-danger h-25'
          style={{ width: '100px' }}
          onClick={props.removeReservedAppointment}
        >
          REMOVE
        </button>
      </div>
    )
  }

  const createAppointmentLabel = () => {
    return (
      <div>
        <label htmlFor='cause'>Chosen appointment's cause</label>
        <h6>{props.selectedAppointmentCause}</h6>
      </div>
    )
  }

  let appointmentCauseElement
  let buttonElement
  const appointmentClasses = []

  if (props.editMode) {
    appointmentCauseElement = createSelectorElement()
    const buttonStyles = classes.Controls + ' d-flex align-items-center'
    buttonElement = createButtonElement(buttonStyles)
    appointmentClasses.push(classes.Appointment)
    appointmentClasses.push('float-left')
  } else {
    appointmentCauseElement = createAppointmentLabel()
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
