import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css'
import SideBar from './components/Navigation/SideBar/SideBar'
import NavBar from './components/Navigation/NavBar/NavBar'
import Content from './components/Content/Content'
import * as actions from './store/actions/auth'

class App extends Component {
  componentWillMount () {
    this.props.checkAuthState()
  }

  state = {
    sideBarVisible: false
  }

  toggleButtonClicked = () => {
    this.setState(prevState => ({
      sideBarVisible: !prevState.sideBarVisible
    }))
  }

  render () {
    let isToggled = false
    const wrapperClasses = ['d-flex']

    if (this.state.sideBarVisible) {
      wrapperClasses.push('toggled')
      isToggled = true
    } else {
      isToggled = false
    }

    return (
      <div className={wrapperClasses.join(' ')} id='wrapper'>
        <SideBar toggled={isToggled} isAuth={this.props.isAuthenticated} />
        <div id='page-content-wrapper'>
          <NavBar
            clicked={this.toggleButtonClicked}
            isAuth={this.props.isAuthenticated}
          />
          <div className='container-fluid layout'>
            <Content isAuth={this.props.isAuthenticated} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuthState: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
