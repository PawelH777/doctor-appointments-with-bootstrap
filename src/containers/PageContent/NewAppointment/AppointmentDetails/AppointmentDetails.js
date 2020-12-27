import React, { Component } from 'react'
import { connect } from 'react-redux'

import { NameDataModel } from '../../../../data/stateDataModels/NameDataModel'
import { LastNameDataModel } from '../../../../data/stateDataModels/LastNameDataModel'
import { EmailDataModel } from '../../../../data/stateDataModels/EmailDataModel'
import { NumberDataModel } from '../../../../data/stateDataModels/NumberDataModel'
import FormWithShadow from '../../../../components/FormWithShadow/FormWithShadow'
import axios from '../../../../axios-doctor-appointments'

class AppointmentDetails extends Component {
  state = {
    inputs: {
      name: new NameDataModel(),
      lastName: new LastNameDataModel(),
      email: new EmailDataModel(),
      number: new NumberDataModel()
    }
  }

  submitHandler = form => {
    const dataToPersist = {
      userId: this.props.userId,
      selectedDates: [...this.props.history.location.state.dates],
      personalInfo: {
        name: form.name.attributes.value,
        lastName: form.lastName.attributes.value,
        email: form.email.attributes.value,
        number: form.number.attributes.value
      }
    }
    axios
      .post('/appointments.json?auth=' + this.props.token, dataToPersist)
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

export default connect(mapStateToProps)(AppointmentDetails)
