import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from '../../../axios-doctor-appointments'
import Appointment from '../../../components/Appointment/Appointment'
import AppointmentCard from '../../../components/AppointmentCard/AppointmentCard'
import { prepareAppointmentDateElement } from '../../../utilities/appointmentUtilities'
import Spinner from '../../../components/Spinner/Spinner'
import classes from './Appointments.module.css'

class Appointments extends Component {
  state = {
    appointments: [],
    loading: true
  }

  componentDidMount () {
    const queryParams = // TODO Change this request in the way that appointments < current day aren't retrieved
      '?auth=' +
      this.props.token +
      '&orderBy="userId"&equalTo="' +
      this.props.userId +
      '"'
    axios.get('/appointments.json' + queryParams).then(response =>
      this.setState({
        appointments: this.collectAppointments(response),
        loading: false
      })
    )
  }

  collectAppointments = response => {
    const appointments = []
    for (let key in response.data) {
      appointments.push(this.buildAppointment(response.data[key], key))
    }
    return appointments
  }

  buildAppointment = (appointmentData, appointmentKey) => {
    return {
      id: appointmentKey,
      information: appointmentData.personalInfo,
      dates: {
        ...appointmentData.selectedDates
      }
    }
  }

  removeReservedReservationHandler = appointmentKey => {
    axios
      .delete(
        '/appointments/' + appointmentKey + '.json?auth=' + this.props.token
      )
      .then(() => {
        this.setState({
          appointments: this.filterAppointments(appointmentKey)
        })
      })
      .catch(error => console.log(error))
  }

  filterAppointments = keyOfAppointmentToBeRemove => {
    return this.state.appointments.filter(
      app => app.id !== keyOfAppointmentToBeRemove
    )
  }

  render () {
    const appointmentCards = []
    let technicalKey = 0
    for (let appointmentKey in this.state.appointments) {
      const appointment = this.state.appointments[appointmentKey]
      const reservedDates = this.createSelectedDateElements(
        appointment.dates,
        technicalKey
      )
      if (reservedDates.length === 0) {
        continue
      }
      const appointmentCard = (
        <AppointmentCard
          key={appointmentKey}
          appointmentId={appointment.id}
          info={appointment.information}
          dates={reservedDates}
          removeReservation={this.removeReservedReservationHandler}
        />
      )
      appointmentCards.push(appointmentCard)
    }
    return this.createContent(appointmentCards)
  }

  createSelectedDateElements = (selectedDates, technicalKey) => {
    const selectedDatesElements = []
    for (let dateKey in selectedDates) {
      const date = this.parseToDate(selectedDates[dateKey])
      const chosenAppointmentCause =
        selectedDates[dateKey].selectedAppointmentCause
      if (date < new Date()) {
        continue
      }
      const formattedDate = (
        <Appointment
          key={technicalKey++}
          editMode={false}
          appointmentTerm={prepareAppointmentDateElement(
            date.toLocaleDateString(),
            date.getHours()
          )}
          selectedAppointmentCause={chosenAppointmentCause}
        />
      )
      selectedDatesElements.push(formattedDate)
    }
    return selectedDatesElements
  }

  parseToDate = selectedDate => {
    return new Date(
      selectedDate.year,
      selectedDate.month,
      selectedDate.day,
      selectedDate.hour
    )
  }

  createContent = appointmentCards => {
    if (!this.state.loading) {
      if (appointmentCards.length > 0) {
        return <div className={classes.Appointments}>{appointmentCards}</div>
      } else {
        return (
          <div className='h2 align-self-center'>
            No appointments! Please make a new one to view it there.
          </div>
        )
      }
    }
    return <Spinner />
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId
  }
}

export default connect(mapStateToProps)(Appointments)
