import React, { Component } from 'react'

import classes from './Form.module.css'
import FormInput from '../../components/UI/FormInput/FormInput'
import { updateObject } from '../../shared/utility'
import { checkValidity } from '../../shared/validation'

class Form extends Component {
  state = {
    inputs: null
  }

  componentDidMount () {
    this.setState({
      inputs: this.props.inputs
    })
  }

  inputChangedHandler = (event, inputName) => {
    const updatedFormElementAttributes = updateObject(
      this.state.inputs[inputName].attributes,
      {
        value: event.target.value
      }
    )

    const updatedFormElementValidation = updateObject(
      this.state.inputs[inputName].validation,
      {
        isValid: checkValidity(event.target.value, this.state.inputs, inputName)
      }
    )

    const updatedFormElement = updateObject(this.state.inputs[inputName], {
      attributes: updatedFormElementAttributes,
      validation: updatedFormElementValidation
    })

    const updatedInputs = updateObject(this.state.inputs, {
      [inputName]: updatedFormElement
    })

    let formIsValid = true
    for (let inputName in updatedInputs) {
      formIsValid = updatedInputs[inputName].validation.isValid && formIsValid
    }

    this.setState({ inputs: updatedInputs, isFormValid: formIsValid })
  }

  render () {
    const inputs = []
    let key = 0

    for (let inputName in this.state.inputs) {
      const input = this.state.inputs[inputName]
      const element = (
        <FormInput
          key={key}
          label={input.label}
          attributes={input.attributes}
          valueChanged={event => this.inputChangedHandler(event, inputName)}
          errors={input.validation.errors}
        />
      )
      inputs.push(element)
      key++
    }

    return (
      <div className={classes.Form}>
        <form className='m-3'>
          {inputs}
          <button
            type='button'
            className='btn btn-primary'
            disabled={!this.state.isFormValid}
            onClick={() => this.props.submitted(this.state.inputs)}
          >
            SUBMIT
          </button>
        </form>
      </div>
    )
  }
}

export default Form
