import React, { Component } from 'react'

import axios from 'axios'

import { NameDataModel } from '../../../../stateDataModels/NameDataModel'
import { LastNameDataModel } from '../../../../stateDataModels/LastNameDataModel'
import { EmailDataModel } from '../../../../stateDataModels/EmailDataModel'
import { NumberDataModel } from '../../../../stateDataModels/NumberDataModel'
import { passwordDataModel } from '../../../../stateDataModels/PasswordDataModel'
import { RepeatedPasswordDataModel } from '../../../../stateDataModels/RepeatedPasswordDataModel'
import Form from '../../../../containers/Form/Form'
import axiosAppointments from '../../../../axios-appointments'

class SignUp extends Component {
  state = {
    inputs: {
      name: NameDataModel,
      lastName: LastNameDataModel,
      email: EmailDataModel,
      number: NumberDataModel,
      password: passwordDataModel(true),
      repeatedPassword: RepeatedPasswordDataModel
    },
    isFormValid: false
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
    registerUser(authData, personalInfo)
  }

  render () {
    return <Form inputs={this.state.inputs} submitted={this.submitHandler} />
  }
}

const registerUser = (authData, personalInfo) => {
  axios
    .post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDOLpcWn2ABinExUQ6BzuXFW0AjVITXM94',
      authData
    )
    .then(() => {
      createNewUser(personalInfo)
      window.alert('New user has been signed up')
    })
    .catch(error => {
      console.log(error)
      window.alert('Critical error. Please do it again, now correctly')
    })
    .finally(() => this.props.history.goBack())
}

const createNewUser = personalInfo => {
  axiosAppointments
    .post('/users.json', personalInfo)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
}

export default SignUp
