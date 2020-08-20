import React, { Component } from 'react'


import FavouritesView from './FavouritesView'

class Favourites extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return <FavouritesView {...this.props} />
  }
}


export default (Favourites)

// FIXME: Is it necessary to split the views in this manner?