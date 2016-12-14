import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import AddLocation from '../components/AddLocation'
import LocationsList from '../components/LocationsList'

import * as Actions from '../actions'

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if(!this.props.locations.length) {
      this.props.actions.findUsersLocation()
    }

    this.props.actions.updateAllLocations()
    setInterval(this.props.actions.updateAllLocations, 300 * 1000)
  }
  render() {
    const { locations, actions } = this.props
    return (
      <main className="container">
        <AddLocation actions={ actions } />
        <LocationsList locations= { locations } actions={ actions } />
      </main>
    )
  }
}

App.propTypes = {
  locations: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    locations: state.locations
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)