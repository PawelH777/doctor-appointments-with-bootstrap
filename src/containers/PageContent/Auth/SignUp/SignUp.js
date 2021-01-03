import React, { Component } from 'react'

import axios from 'axios'
import { withRouter } from 'react-router-dom'

import { NameDataModel } from '../../../../data/inputsDataModels/NameDataModel'
import { LastNameDataModel } from '../../../../data/inputsDataModels/LastNameDataModel'
import { EmailDataModel } from '../../../../data/inputsDataModels/EmailDataModel'
import { NumberDataModel } from '../../../../data/inputsDataModels/NumberDataModel'
import { PasswordDataModel } from '../../../../data/inputsDataModels/PasswordDataModel'
import { RepeatedPasswordDataModel } from '../../../../data/inputsDataModels/RepeatedPasswordDataModel'
import FormWithShadow from '../../../../components/FormWithShadow/FormWithShadow'
import axiosAppointments from '../../../../axios-doctor-appointments'

class SignUp extends Component {
  state = {
    inputs: {
      name: new NameDataModel(),
      lastName: new LastNameDataModel(),
      email: new EmailDataModel(),
      number: new NumberDataModel(),
      password: new PasswordDataModel(true),
      repeatedPassword: new RepeatedPasswordDataModel()
    }
  }

  submitHandler = form => {
    const email = form.email.attributes.value
    const password = form.password.attributes.value
    const personalInfo = {
      name: form.name.attributes.value,
      lastName: form.lastName.attributes.value,
      email: email,
      number: form.number.attributes.value
    }
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    this.registerUser(authData, personalInfo)
  }

  registerUser = (authData, personalInfo) => {
    axios
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDOLpcWn2ABinExUQ6BzuXFW0AjVITXM94',
        authData
      )
      .then(() => {
        this.createNewUser(personalInfo)
        window.alert('New user has been signed up')
      })
      .catch(error => {
        console.log(error)
        window.alert('Critical error. Please do it again, now correctly')
      })
      .finally(() => this.props.history.goBack())
  }

  createNewUser = personalInfo => {
    axiosAppointments
      .post('/users.json', personalInfo)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
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

export default withRouter(SignUp)
