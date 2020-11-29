import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from '../../../axios-doctor-appointments'
import SelectedDate from '../../../components/Appointment/Appointment'
import AppointmentCard from '../../../components/AppointmentCard/AppointmentCard'
import { prepareAppointmentDateElement } from '../../../utilities/appointmentUtilities'
import classes from './Appointments.module.css'

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

const filterAppointments = (appointments, keyOfAppointmentToBeRemove) => {
  return appointments.filter(app => app.id !== keyOfAppointmentToBeRemove)
}

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
        appointmentTerm={prepareAppointmentDateElement(date)}
        appointmentCauses={appointmentCauses}
        selectedAppointmentCause={date.selectedAppointmentCause}
      />
    )
    selectedDatesElements.push(formattedDate)
  }
  return selectedDatesElements
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId
  }
}

export default connect(mapStateToProps)(Appointments)
