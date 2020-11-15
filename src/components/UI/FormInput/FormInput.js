import React from 'react'

const formInput = props => {
  let errorMessages = []
  const inputClases = ['form-control']

  const errors = props.errors
  if (errors.length > 0) {
    prepareErrorMessages(errors, inputClases)
  }

  return (
    <div className='mb-3 form-group text-left'>
      <label htmlFor={props.label.for}>{props.label.value}</label>
      <input
        type={props.attributes.type}
        className={inputClases.join(' ')}
        id={props.attributes.id}
        placeholder={props.attributes.placeholder}
        value={props.attributes.value}
        onChange={props.valueChanged}
      />
      {errorMessages}
    </div>
  )
}

const prepareErrorMessages = (errors, inputClases) => {
  inputClases.push('border-danger')
  let key = 0
  return errors.map(error => {
    return createErrorMessageElement(error, key++)
  })
}

const createErrorMessageElement = (error, key) => {
  return (
    <div key={key} className='form-row'>
      <small className='text-danger mt-1'>{error}</small>
    </div>
  )
}

export default formInput
