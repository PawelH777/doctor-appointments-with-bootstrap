import React from 'react'

import Form from '../../containers/Form/Form'
import classes from './FormWithShadow.module.css'

const FormWithShadow = props => (
  <div className={classes.Shadow}>
    <Form {...props} />
  </div>
)

export default FormWithShadow
