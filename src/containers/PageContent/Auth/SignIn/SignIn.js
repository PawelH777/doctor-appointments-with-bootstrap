import React, { Component } from 'react'
import { connect } from 'react-redux'

import { EmailDataModel } from '../../../../data/stateDataModels/EmailDataModel'
import { passwordDataModel } from '../../../../data/stateDataModels/PasswordDataModel'
import * as actions from '../../../../store/actions/auth'
import FormWithShadow from '../../../../components/FormWithShadow/FormWithShadow'

class SignIn extends Component {
  state = {
    inputs: {
      email: new EmailDataModel(),
      password: passwordDataModel(false)
    },
    isFormValid: false
  }

  submitHandler = form => {
    const email = form.email.attributes.value
    const password = form.password.attributes.value
    this.props.onAuth(email, password).then(() => this.props.history.goBack())
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

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  }
}

export default connect(null, mapDispatchToProps)(SignIn)
