import React, { Component } from 'react'
import { connect } from 'react-redux'

import Aux from '../../../hoc/Auxiliary/Auxiliary'

class Start extends Component {
  state = {
    pathToRedirect: '/login',
    buttonLabel: 'LOG IN'
  }

  componentDidMount () {
    let actualPathToRedirect = '/login'
    let actualButtonLabel = 'LOG IN'
    if (this.props.isAuthenticated) {
      actualPathToRedirect = '/new'
      actualButtonLabel = 'SCHEDULE THE MEETING'
    }
    this.setState({
      pathToRedirect: actualPathToRedirect,
      buttonLabel: actualButtonLabel
    })
  }

  redirect = path => {
    this.props.history.push(path)
  }

  render () {
    return (
      <Aux>
        <div class='h2 mb-4'> Welcome to my page! </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet
          ipsum sed consequat condimentum. Aenean non libero arcu. Maecenas
          gravida elit et porta posuere. Duis semper felis et ante hendrerit
          congue. Nulla pellentesque elit metus, ac tincidunt risus ultrices
          vel. Vivamus facilisis nulla velit, eget auctor dolor interdum id.
          Morbi aliquet lectus at lorem pharetra, et imperdiet metus varius. Nam
          id scelerisque ex. Aenean mollis iaculis maximus. Suspendisse a
          imperdiet velit, in rhoncus turpis. Fusce fringilla massa eu risus
          tempus consectetur. Sed ac sem vehicula, hendrerit erat in,
          ullamcorper ligula. Phasellus ornare egestas tortor non rutrum.
        </p>
        <p>
          Sed id ipsum eget tellus varius consequat a quis est. Maecenas feugiat
          dolor nec laoreet ultrices. Morbi eget nibh a libero molestie pretium
          sit amet a lorem. Praesent mi odio, pulvinar eu risus at, gravida
          convallis lacus. Integer quis lacus at ipsum semper vehicula. Etiam in
          tellus blandit nibh mattis maximus eget sed augue. Cras at risus nec
          massa sollicitudin luctus. Ut arcu justo, porta at turpis vel, aliquam
          elementum justo. Nulla metus dolor, eleifend vel consequat quis,
          lacinia vitae lectus.
        </p>
        <button
          className='btn btn-primary mt-4 mb-4'
          onClick={() => this.redirect(this.state.pathToRedirect)}
        >
          {this.state.buttonLabel}
        </button>
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Start)
