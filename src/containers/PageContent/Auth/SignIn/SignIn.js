import React, { Component } from 'react'
import { connect } from 'react-redux'

import { EmailDataModel } from '../../../../stateDataModels/EmailDataModel'
import { passwordDataModel } from '../../../../stateDataModels/PasswordDataModel'
import Form from '../../../Form/Form'
import * as actions from '../../../../store/actions/auth'

class SignIn extends Component {
  state = {
    inputs: {
      email: EmailDataModel,
      password: passwordDataModel(false)
    },
    isFormValid: false
  }

  submitHandler = form => {
    const email = form.email.attributes.value
    const password = form.password.attributes.value
    this.props.onAuth(email, password)
    this.props.history.goBack()
  }

  render () {
    return <Form inputs={this.state.inputs} submitted={this.submitHandler} />
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  }
}

export default connect(null, mapDispatchToProps)(SignIn)
