import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import './Layout.css'
import NavBar from '../../components/Navigation/NavBar/NavBar'
import Content from '../Content/Content'

class Layout extends Component {
  state = {
    sideBarVisible: false
  }

  render () {
    return (
      <div className='d-flex' id='wrapper'>
        <div id='page-content-wrapper'>
          <NavBar isAuth={this.props.isAuthenticated} />
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

export default withRouter(connect(mapStateToProps)(Layout))
