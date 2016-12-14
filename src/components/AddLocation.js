import React, { Component, PropTypes } from 'react'

class AddLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleInput(e) {
    this.setState({ name: e.target.value.substr(0, 25) })
  }
  handleSubmit(e) {
    e.preventDefault()
    if(this.state.name.trim()) {
      this.props.actions.addLocation(this.state.name)
      this.setState({ name: '' })
    }
  }
  render() {
    return (
      <header className="weather-head">
       <form onSubmit={this.handleSubmit} className="input-form">
          <input type='text' placeholder='Enter location name...' 
            onChange={this.handleInput}
            value={this.state.name}  />
          <input type='submit' value='Add' className="button" />
          <input type='button' value='Find by IP' className="button"
            onClick={this.props.actions.findUsersLocation} />
        </form>    
      </header>  
    )
  }
}

export default AddLocation