import React from 'react'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import classes from './Selector.module.css'

const selector = props => {
  let appointmentCauseItems = []
  let index = 0
  appointmentCauseItems = props.appointmentCauses.map(cause => {
    return (
      <MenuItem key={index++} value={cause}>
        {cause}
      </MenuItem>
    )
  })

  return (
    <FormControl className={classes.FormControl}>
      <InputLabel id='appointment-cause-label'>Appointment's cause</InputLabel>
      <Select
        id='appointment-cause'
        labelId='appointment-cause-label'
        value={props.selectedAppointmentCause}
        onChange={props.appointmentCauseChanged}
      >
        {appointmentCauseItems}
      </Select>
    </FormControl>
  )
}

export default selector
