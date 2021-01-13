import React from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

import Start from '../../containers/PageContent/Start/Start'
import LogOut from '../../containers/PageContent/Auth/LogOut/LogOut'
import SignIn from '../../containers/PageContent/Auth/SignIn/SignIn'
import SignUp from '../../containers/PageContent/Auth/SignUp/SignUp'
import AppointmentsScheduler from '../../containers/PageContent/AppointmentsScheduler/AppointmentsScheduler'
import PatientInformation from '../../containers/PageContent/PatientInformation/PatientInformation'
import Appointments from '../../containers/PageContent/Appointments/Appointments'
import Contact from '../../containers/PageContent/Contact/Contact'

const content = props => {
  const routesWhenAuthenticated = (
    <Switch>
      <Route path='/logout' component={LogOut} />
      <Route path='/scheduler/patient-info' component={PatientInformation} />
      <Route path='/appointments' component={Appointments} />
      <Route path='/scheduler' component={AppointmentsScheduler} />
      <Route path='/contact' component={Contact} />
      <Route path='/home' exact component={Start} />
      <Route path='/' exact component={Start} />
      <Redirect to='/' />
    </Switch>
  )

  const routesWhenUnauthenticated = (
    <Switch>
      <Route path='/login' component={SignIn} />
      <Route path='/signup' component={SignUp} />
      <Route path='/contact' component={Contact} />
      <Route path='/home' exact component={Start} />
      <Route path='/' exact component={Start} />
      <Redirect to='/' />
    </Switch>
  )

  return (
    <div className='w-75 h-100 d-flex align-items-center justify-content-center'>
      {props.isAuth ? routesWhenAuthenticated : routesWhenUnauthenticated}
    </div>
  )
}

export default withRouter(content)
