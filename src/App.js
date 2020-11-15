import React, { Component } from 'react'
import { connect } from 'react-redux'

import Layout from './containers/Layout/Layout'
import * as actions from './store/actions/auth'

class App extends Component {
  componentWillMount () {
    this.props.checkAuthState()
  }

  render () {
    return <Layout />
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuthState: () => dispatch(actions.authCheckState())
  }
}

export default connect(null, mapDispatchToProps)(App)
