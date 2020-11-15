import React from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'

import classes from './Content.module.css'
import Start from '../../containers/PageContent/Start/Start'
import LogOut from '../../containers/PageContent/Auth/LogOut/LogOut'
import SignIn from '../../containers/PageContent/Auth/SignIn/SignIn'
import SignUp from '../../containers/PageContent/Auth/SignUp/SignUp'
import NewAppointment from '../../containers/PageContent/NewAppointment/NewAppointment'
import AppointmentsDetails from '../../containers/PageContent/NewAppointment/AppointmentDetails/AppointmentDetails'
import Appointments from '../../containers/PageContent/Appointments/Appointments'

const content = props => {
  const routesWhenAuthenticated = (
    <Switch>
      <Route path='/logout' component={LogOut} />
      <Route path='/new/details' component={AppointmentsDetails} />
      <Route path='/appointments' component={Appointments} />
      <Route path='/new' component={NewAppointment} />
      <Route path='/' exact component={Start} />
      <Redirect to='/' />
    </Switch>
  )

  const routesWhenUnauthenticated = (
    <Switch>
      <Route path='/login' component={SignIn} />
      <Route path='/signup' component={SignUp} />
      <Route path='/' exact component={Start} />
      <Redirect to='/' />
    </Switch>
  )

  return (
    <div className={classes.Content}>
      {props.isAuth ? routesWhenAuthenticated : routesWhenUnauthenticated}
    </div>
  )
}

export default withRouter(content)
