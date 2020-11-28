import React from 'react'

const formInput = props => {
  let errorMessages = []
  const inputClases = ['form-control']

  const errors = props.errors
  if (errors.length > 0) {
    errorMessages = prepareErrorMessages(errors, inputClases)
  }

  const input = createInput(props, inputClases)

  return (
    <div className='mb-3 form-group text-left'>
      <label htmlFor={props.label.for}>{props.label.value}</label>
      {input}
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

const createInput = (input, inputClases) => {
  switch (input.attributes.type) {
    case 'textarea':
      return (
        <textarea
          className={inputClases.join(' ')}
          id={input.attributes.id}
          type={input.attributes.type}
          placeholder={input.attributes.placeholder}
          rows={input.attributes.rows}
          value={input.attributes.value}
          onChange={input.valueChanged}
        />
      )
    default:
      return (
        <input
          className={inputClases.join(' ')}
          id={input.attributes.id}
          type={input.attributes.type}
          placeholder={input.attributes.placeholder}
          value={input.attributes.value}
          onChange={input.valueChanged}
        />
      )
  }
}

export default formInput
