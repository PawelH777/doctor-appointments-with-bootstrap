import 'date-fns'

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import DateFnsUtils from '@date-io/date-fns'
import Divider from '@material-ui/core/Divider'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'

import * as Causes from '../../../constants/AppointmentCausesConstants'
import { findAppointments as findAppointmentsInFirebase } from '../../../axios-appointments'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import ListItem from '../../../components/UI/ListItem/ListItem'
import classes from './NewAppointment.module.css'
import Appointment from '../../../components/Content/Appointment/Appointment'
import {
  prepareAppointmentDateElement,
  prepareAppointmentsMap
} from '../Common/AppointmentUtilities'

class NewAppointment extends Component {
  state = {
    date: new Date(),
    appointmentRange: {},
    dates: [],
    selectedDates: [],
    appointmentCauses: [
      Causes.INTERNAL_MEDICINE_CONSULTATION,
      Causes.FAMILY_DOCTOR_CONSULTATION,
      Causes.ONLINE_CONSULTATION
    ]
  }

  componentDidMount () {
    findAppointmentsInFirebase(this.props.token, response =>
      this.appointmentsFoundHandler(response)
    )
  }

  appointmentsFoundHandler = response => {
    const alreadyReservedAppointments = []
    for (let key in response.data) {
      alreadyReservedAppointments.push(...response.data[key].selectedDates)
    }
    const appointmentRange = prepareAppointmentsMap(alreadyReservedAppointments)
    const dateConvertedToString = this.state.date.toLocaleDateString()
    const reservationFromCurrentDay = appointmentRange[dateConvertedToString]
    this.setState({
      appointmentRange: appointmentRange,
      dates: reservationFromCurrentDay
    })
  }

  dateChangeHandler = date => {
    const reservationFromCurrentDay = this.state.appointmentRange[
      date.toLocaleDateString()
    ]
    this.setState({
      date: date,
      dates: reservationFromCurrentDay
    })
  }

  appointmentCauseChangeHandler = (event, selDate) => {
    const updatedSelectedDates = this.state.selectedDates.map(selectedDate => {
      if (selectedDate.id === selDate.id) {
        selectedDate.selectedAppointmentCause = event.target.value
      }
      return selectedDate
    })
    this.setState({ selectedDates: updatedSelectedDates })
  }

  listItemClickedHandler = appointment => {
    const updatedDates = this.reserveChoosedDate(appointment)
    this.setState({
      dates: updatedDates,
      appointmentRange: this.updateAppointmentRange(
        this.state.date.toLocaleDateString(),
        updatedDates
      ),
      selectedDates: this.addChoosedDateToAlreadySelectedDates(appointment)
    })
  }

  reserveChoosedDate = appointment => {
    return this.state.dates.map(app => {
      if (app.id === appointment.id) {
        return {
          ...app,
          isReserved: true
        }
      } else {
        return app
      }
    })
  }

  updateAppointmentRange = (day, updatedDates) => {
    return {
      ...this.state.appointmentRange,
      [day]: updatedDates
    }
  }

  addChoosedDateToAlreadySelectedDates = appointment => {
    const updatedSelectedDates = [...this.state.selectedDates]
    const newSelectedDate = {
      ...appointment,
      isReserved: true,
      selectedAppointmentCause: Causes.INTERNAL_MEDICINE_CONSULTATION
    }
    updatedSelectedDates.push(newSelectedDate)
    return updatedSelectedDates
  }

  removeReservedAppointmentHandler = reservedDate => {
    const updatedDates = this.removeReservation(reservedDate)
    this.setState({
      appointmentRange: this.updateAppointmentRange(
        reservedDate.date,
        updatedDates
      ),
      selectedDates: this.filterOutReservation(reservedDate.id)
    })
    if (reservedDate.date === this.state.date.toLocaleDateString()) {
      this.setState({
        dates: updatedDates
      })
    }
  }

  removeReservation = reservedDate => {
    return this.state.appointmentRange[reservedDate.date].map(app => {
      if (app.hour === reservedDate.hour) {
        return {
          ...app,
          isReserved: false
        }
      } else {
        return app
      }
    })
  }

  filterOutReservation = reservedDateId => {
    return this.state.selectedDates.filter(
      selectedDate => selectedDate.id !== reservedDateId
    )
  }

  proceedWithReservation = () => {
    this.props.history.push({
      pathname: '/new/details',
      state: { dates: this.state.selectedDates }
    })
  }

  redirectToSignIn = () => {
    this.props.history.push({
      pathname: '/login'
    })
  }

  render () {
    const dateListElement = this.prepareDateListElement()
    const reservedAppointments = this.prepareReservationsElements()
    let redirectButton
    if (this.state.selectedDates.length > 0) {
      const isAuthenticated = this.props.isAuthenticated
      const onClickAction = isAuthenticated
        ? this.proceedWithReservation
        : this.redirectToSignIn
      const buttonLabel = isAuthenticated ? 'PROCEED' : 'PLEASE SIGN IN'
      redirectButton = (
        <div>
          <button
            type='button'
            className='btn btn-primary w-25 h-25 mb-5'
            onClick={onClickAction}
          >
            {buttonLabel}
          </button>
        </div>
      )
    }
    return (
      <Aux>
        <div className={classes.TimeTable}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant='inline'
              format='MM/dd/yyyy'
              margin='normal'
              id='date-picker-inline'
              label='Date picker inline'
              value={this.state.date}
              onChange={this.dateChangeHandler}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
            <div className={classes.ListWrapper}>{dateListElement}</div>
          </MuiPickersUtilsProvider>
        </div>
        <Divider />
        {reservedAppointments}
        {redirectButton}
      </Aux>
    )
  }

  prepareDateListElement = () => {
    let id = 0
    return this.state.dates.map(appointment => {
      return (
        <ListItem
          key={id++}
          isButton
          isDisabled={appointment.isReserved}
          clicked={() => this.listItemClickedHandler(appointment)}
          primary={prepareAppointmentDateElement(appointment)}
          secondary={appointment.isReserved ? 'Reserved' : 'Not reserved'}
          paperCss={classes.Paper}
        />
      )
    })
  }

  prepareReservationsElements = () => {
    let index = 0
    return this.state.selectedDates.map(selectedDate => {
      return (
        <Appointment
          key={index++}
          editMode={true}
          appointmentTerm={prepareAppointmentDateElement(selectedDate)}
          appointmentCauses={this.state.appointmentCauses}
          selectedAppointmentCause={selectedDate.selectedAppointmentCause}
          appointmentCauseChanged={event =>
            this.appointmentCauseChangeHandler(event, selectedDate)
          }
          removeReservedAppointment={() =>
            this.removeReservedAppointmentHandler(selectedDate)
          }
        />
      )
    })
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    isAuthenticated: state.auth.token !== null
  }
}

export default withRouter(connect(mapStateToProps)(NewAppointment))
