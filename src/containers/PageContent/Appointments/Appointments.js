import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from '../../../axios-appointments'
import classes from './Appointments.module.css'
import SelectedDate from '../../../components/Content/Appointment/Appointment'
import AppointmentCard from '../../../components/Content/AppointmentCard/AppointmentCard'
import { prepareAppointmentTerm } from '../Common/AppointmentUtilities'

class Appointments extends Component {
  state = {
    appointments: []
  }

  componentDidMount () {
    const queryParams =
      '?auth=' +
      this.props.token +
      '&orderBy="userId"&equalTo="' +
      this.props.userId +
      '"'
    axios
      .get('/appointments.json' + queryParams)
      .then(response =>
        this.setState({ appointments: collectAppointments(response) })
      )
  }

  removeReservedReservationHandler = appointmentKey => {
    axios
      .delete(
        '/appointments/' + appointmentKey + '.json?auth=' + this.props.token
      )
      .then(() => {
        this.setState({
          appointments: filterAppointments(
            this.state.appointments,
            appointmentKey
          )
        })
      })
      .catch(error => console.log(error))
  }

  render () {
    const appointments = []
    let technicalKey = 0
    for (let appointmentKey in this.state.appointments) {
      const appointment = this.state.appointments[appointmentKey]
      const appointmentCard = (
        <AppointmentCard
          key={appointmentKey}
          info={appointment.information}
          dates={createSelectedDateElements(
            appointment.dates,
            appointment.appointmentCauses,
            technicalKey
          )}
          removeReservation={this.removeReservedReservationHandler}
          appointmentId={appointment.id}
        />
      )
      appointments.push(appointmentCard)
    }
    return <div className={classes.Appointments}>{appointments}</div>
  }
}

// Private methods used in ComponentDidMount hook
const collectAppointments = response => {
  const appointments = []
  for (let key in response.data) {
    appointments.push(buildAppointment(response.data[key], key))
  }
  return appointments
}

const buildAppointment = (appointmentData, appointmentKey) => {
  return {
    id: appointmentKey,
    information: appointmentData.personalInfo,
    dates: {
      ...appointmentData.selectedDates
    }
  }
}

// Private method used to filter out certain appointment
const filterAppointments = (appointments, keyOfAppointmentToBeRemove) => {
  return appointments.filter(app => app.id !== keyOfAppointmentToBeRemove)
}

// Private method, prepares create representations of reserved dates which will be displayed
const createSelectedDateElements = (
  selectedDates,
  appointmentCauses,
  technicalKey
) => {
  const selectedDatesElements = []
  for (let dateKey in selectedDates) {
    const date = selectedDates[dateKey]
    const formattedDate = (
      <SelectedDate
        key={technicalKey++}
        editMode={false}
        appointmentTerm={prepareAppointmentTerm(date)}
        appointmentCauses={appointmentCauses}
        selectedAppointmentCause={date.selectedAppointmentCause}
      />
    )
    selectedDatesElements.push(formattedDate)
  }
  return selectedDatesElements
}

// Method enabling using the state from store
const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId
  }
}

export default connect(mapStateToProps)(Appointments)
