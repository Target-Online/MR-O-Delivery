import React, { Component } from 'react'
import { connect } from 'react-redux'

import ContactView from './ContactView'

class Contact extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return <ContactView {...this.props} />
  }
}

function mapStateToProps () {
  return {}
}
function mapDispatchToProps () {
  return {}
}
export default Contact

// FIXME: Is it necessary to split the views in this manner?