import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Location extends Component {
  constructor(props) {
    super(props)

    this.updateWeatherData = this.updateWeatherData.bind(this)
    this.removeLocation    = this.removeLocation.bind(this)

    if (!this.props.weather) this.updateWeatherData()
  }

  updateWeatherData() {
    this.props.askWeatherData( this.props.id )
  }

  removeLocation() {
    this.props.removeLocation( this.props.id )
  }

  render() {
    let { weather = null } = this.props
    let weatherData
    
    if (weather) {
      weatherData = 
        <div className="weatherData">
          <span className="left">
            <i className="wi wi-thermometer wi-sm"></i>
            {weather.temp} °C <br/>
            <i className="wi wi-humidity wi-sm"></i>
            {weather.humidity} % <br/>
            <i className="wi wi-barometer wi-sm"></i>
            {weather.pressure} mm <br/>
          </span>
          <i className={weather.icon + ' wi-big'}></i>
        </div>
    } else {
      weatherData = <span>Loading...</span>
    }

    const station = weather ? weather.station.toLowerCase() : null

    return (
      <div className="chunk">
        <b>{this.props.name}</b>
        <span className='close-btn' onClick={this.removeLocation}>&times;</span><br/>

        <span style={{fontSize: 14}}>
          {(station !== this.props.name.toLowerCase()) ? station : ''}
        </span>

        {weatherData}

      </div>
    )
  }
}

Location.propTypes = {
  name: PropTypes.string.isRequired
}

export default connect()(Location)