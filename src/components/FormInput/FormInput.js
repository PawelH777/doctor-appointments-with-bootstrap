import React from 'react'

const formInput = props => {
  const prepareErrorMessages = inputClasses => {
    inputClasses.push('border-danger')
    let key = 0
    return props.errors.map(error => {
      return createErrorMessageElement(error, key++)
    })
  }

  const createErrorMessageElement = (error, key) => {
    return (
      <div key={key} className='form-row error-message'>
        <small className='text-danger mt-1'>{error}</small>
      </div>
    )
  }

  const createInput = inputClasses => {
    switch (props.attributes.type) {
      case 'textarea':
        return (
          <textarea
            className={inputClasses.join(' ')}
            id={props.attributes.id}
            placeholder={props.attributes.placeholder}
            rows={props.attributes.rows}
            value={props.attributes.value}
            onChange={props.valueChanged}
          />
        )
      default:
        return (
          <input
            className={inputClasses.join(' ')}
            id={props.attributes.id}
            type={props.attributes.type}
            placeholder={props.attributes.placeholder}
            value={props.attributes.value}
            onChange={props.valueChanged}
          />
        )
    }
  }

  let errorMessages = []
  const inputClasses = ['form-control']

  if (props.errors.length > 0) {
    errorMessages = prepareErrorMessages(inputClasses)
  }

  return (
    <div className='mb-3 form-group text-left'>
      <label htmlFor={props.label.for}>{props.label.value}</label>
      {createInput(inputClasses)}
      {errorMessages}
    </div>
  )
}

export default formInput
