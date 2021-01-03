import React, { Component } from 'react'
import { connect } from 'react-redux'

import FormWithShadow from '../../../components/FormWithShadow/FormWithShadow'
import axios from '../../../axios-doctor-appointments'
import { NameDataModel } from '../../../data/inputsDataModels/NameDataModel'
import { LastNameDataModel } from '../../../data/inputsDataModels/LastNameDataModel'
import { EmailDataModel } from '../../../data/inputsDataModels/EmailDataModel'
import { NumberDataModel } from '../../../data/inputsDataModels/NumberDataModel'
import { PatientInfo } from '../../../data/dataStructures/PatientInfo'
import { AppointmentReservation } from '../../../data/dataStructures/AppointmentReservation'

class PatientInformation extends Component {
  state = {
    inputs: {
      name: new NameDataModel(),
      lastName: new LastNameDataModel(),
      email: new EmailDataModel(),
      number: new NumberDataModel()
    }
  }

  submitHandler = form => {
    const patientInfo = new PatientInfo()
    patientInfo.setName(form.name.attributes.value)
    patientInfo.setLastName(form.lastName.attributes.value)
    patientInfo.setEmail(form.email.attributes.value)
    patientInfo.setNumber(form.number.attributes.value)
    const appointmentReservation = new AppointmentReservation()
    appointmentReservation.setUserId(this.props.userId)
    appointmentReservation.setPatientInformation(patientInfo)
    appointmentReservation.setReservedAppointments(
      this.props.history.location.state.reservedAppointments
    )
    axios
      .post(
        '/appointments.json?auth=' + this.props.token,
        appointmentReservation
      )
      .catch(error => {
        console.log(error)
      })
    this.props.history.push('/')
  }

  render () {
    return (
      <FormWithShadow
        inputs={this.state.inputs}
        submitted={this.submitHandler}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId
  }
}

export default connect(mapStateToProps)(PatientInformation)
