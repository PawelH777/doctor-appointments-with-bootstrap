import React from 'react'

import ListItem from '../ListItem/ListItem'
import Selector from '../Selector/Selector'
import classes from './Appointment.module.css'

const appointment = props => {
  let appointmentCauseElement
  let buttonElement
  const appointmentClasses = []

  if (props.editMode) {
    appointmentCauseElement = createSelectorElement(props)
    const buttonStyles = classes.Controls + ' d-flex align-items-center'
    buttonElement = createButtonElement(
      buttonStyles,
      props.removeReservedAppointment
    )
    appointmentClasses.push(classes.Appointment)
    appointmentClasses.push('float-left')
  } else {
    appointmentCauseElement = createAppointmentLabel(
      props.selectedAppointmentCause
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

const createSelectorElement = props => {
  return (
    <Selector
      disabled={props.isSelectorDisabled}
      appointmentCauses={props.appointmentCauses}
      selectedAppointmentCause={props.selectedAppointmentCause}
      appointmentCauseChanged={props.appointmentCauseChanged}
    />
  )
}

const createButtonElement = (styles, removeReservedAppointment) => {
  return (
    <div className={styles}>
      <button
        type='button'
        className='btn btn-danger w-50 h-25'
        onClick={removeReservedAppointment}
      >
        REMOVE
      </button>
    </div>
  )
}

const createAppointmentLabel = appointmentCause => {
  return (
    <div>
      <label htmlFor='cause'>Chosen appointment's cause</label>
      <h6>{appointmentCause}</h6>
    </div>
  )
}

export default appointment
