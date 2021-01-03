import 'date-fns'

import React from 'react'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'

import classes from './TimeTable.module.css'
import ListItem from '../ListItem/ListItem'
import { prepareAppointmentDateElement } from '../../utilities/appointmentUtilities'
import { findLastAvailableDate } from '../../utilities/dateUtilties'

const timeTable = props => {
  const disableWeekends = day => {
    return (
      day.getDay() === 0 || day.getDay() === 6 || day > findLastAvailableDate()
    )
  }

  const prepareDateListElement = () => {
    let id = 0
    return props.appointments.map(appointment => {
      return (
        <ListItem
          key={id++}
          isButton
          isDisabled={appointment.isReserved}
          clicked={() => props.listItemClicked(appointment)}
          primary={prepareAppointmentDateElement(
            appointment.date,
            appointment.hour
          )}
          secondary={appointment.isReserved ? 'Reserved' : 'Not reserved'}
          paperCss={classes.Paper}
        />
      )
    })
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant='inline'
        format='MM/dd/yyyy'
        margin='normal'
        id='date-picker-inline'
        label='Date picker inline'
        value={props.actualDate}
        onChange={props.changed}
        disablePast={true}
        shouldDisableDate={day => disableWeekends(day)}
        KeyboardButtonProps={{
          'aria-label': 'change date'
        }}
      />
      <div className={classes.ListWrapper}>{prepareDateListElement()}</div>
    </MuiPickersUtilsProvider>
  )
}

export default timeTable
