import * as Action from '../constants/actionTypes'
import { IP_API, URL, API_KEY } from '../constants/dataAPI'

import fetchData from '../extra/fetchData'
import getWeatherIcon from '../extra/getWeatherIcon'

export function addLocation(name, coord = null) {
  return {
    type: Action.ADD_LOCATION,
    name,
    coord
  }
}

export function removeLocation(id) {
  return {
    type: Action.REMOVE_LOCATION,
    id
  }
}

export function askWeatherData(id) {
  return function(dispatch, getState) {
    const { locations } = getState()
    const {name, coord = null } = locations[id]

    const params = (coord) ? `&lat=${coord.lat}&lon=${coord.lon}` : `&q=${name}`

    let requestURL = URL
    requestURL += `weather?${params}&appid=${API_KEY}&units=metric&cnt=15`

    return fetchData(requestURL, (err, response) => {
      if(!err) {
        dispatch(updateWeather(id, response))
      } else {
        console.info('Invalid value...')
        dispatch(removeLocation(id))
      }
    })
  }
}

export function updateWeather(id, res) {
  const weather = {
    temp:     Math.round(res.main.temp),
    humidity: res.main.humidity,
    pressure: Math.round(res.main.pressure * 0.75),
    icon:     getWeatherIcon(res),
    station: res.name
  }
  return {
    type: Action.UPDATE_WEATHER,
    weather,
    id
  }
}
// To fix HTTP 429 Error (too many requests)
export function updateAllLocations() {
  return function(dispatch, getState) {
    const state = getState()
    return state.locations.forEach((location, id) => {
      setTimeout(
        () => dispatch(askWeatherData(id)), id * 300
      )
    })
  }
}

export function findUsersLocation() {
  return function(dispatch) {
    return fetchData(IP_API, (err, response) => {
      if(!err) {
        const { city, lat, lon } = response
        dispatch(addLocation(city, {lat, lon}))
      }
    })
  }
}