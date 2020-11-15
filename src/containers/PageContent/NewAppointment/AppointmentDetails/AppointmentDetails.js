import React, { Component } from 'react'
import { connect } from 'react-redux'

import { NameDataModel } from '../../../../stateDataModels/NameDataModel'
import { LastNameDataModel } from '../../../../stateDataModels/LastNameDataModel'
import { EmailDataModel } from '../../../../stateDataModels/EmailDataModel'
import { NumberDataModel } from '../../../../stateDataModels/NumberDataModel'
import Form from '../../../Form/Form'
import axios from '../../../../axios-appointments'

class AppointmentDetails extends Component {
  state = {
    inputs: {
      name: NameDataModel,
      lastName: LastNameDataModel,
      email: EmailDataModel,
      number: NumberDataModel
    },
    isFormValid: false
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
    console.log(this.props)
    return <Form inputs={this.state.inputs} submitted={this.submitHandler} />
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId
  }
}

export default connect(mapStateToProps)(AppointmentDetails)
