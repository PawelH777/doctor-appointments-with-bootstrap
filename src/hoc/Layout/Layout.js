import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import classes from './Layout.module.css'
import NavBar from '../../components/Navigation/NavBar/NavBar'
import Content from '../Content/Content'

class Layout extends Component {
  state = {
    sideBarVisible: false
  }

  render () {
    return (
      <div className={classes.Layout}>
        <div className={classes.Sticky}>
          <NavBar isAuth={this.props.isAuthenticated} />
        </div>
        <div
          className='d-flex align-self-center justify-content-center container-fluid text-center'
          style={{ height: '90%' }}
        >
          <Content isAuth={this.props.isAuthenticated} />
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
