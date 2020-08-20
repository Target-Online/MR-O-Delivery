import React, { Component } from 'react'
import { connect } from 'react-redux'

import FavouritesView from './FavouritesView'

class Favourites extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return <FavouritesView {...this.props} />
  }
}

function mapStateToProps () {
  return {}
}
function mapDispatchToProps (dispatch) {
  return {
    onLogin: (un, pwd) => dispatch(loginActions.requestLogin(un, pwd))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favourites)

// FIXME: Is it necessary to split the views in this manner?