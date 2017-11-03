import React, { Component } from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import FieldComponent from './FieldComponent.js'
import AlgorithmComponent from './AlgorithmComponent.js'
import ResultsComponent from './ResultsComponent.js'

export default class UserInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      participants: undefined,
      user_data: undefined,
      user_id: undefined,
      results: undefined,
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/participants')
      .then(response => this.setState({participants: response.data}))

    this.setState({user_id: '1119'})
    axios.get('http://localhost:5000/details?user_id=1119')
      .then(response => this.setState({user_details: response.data}))
  } 

  handleParticipantChanged(e) {
    let user_id = e.target.value;
    this.setState({user_id: user_id})
    axios.get('http://localhost:5000/details?user_id=' + user_id)
      .then(response => this.setState({user_details: response.data}))
  }

  handleResultCalculated(result) {
    this.setState({results: result})
  }

  render() {
    if (this.state.participants === undefined) {
      return(<span> Loading participants...</span>)
    }
    return (
      <div className='row'>
        <h4>Enter the candidate</h4>
        <p>Please enter treatment id, day, hour, steps hour, steps total to predict if the number of steps is going to be met:</p>
        <div className='col s12 l6'>
          <FieldComponent field_id='treatment_id' field_label='label' options={this.state.participants} handlerFunction={this.handleParticipantChanged.bind(this)}/>
          <AlgorithmComponent user_id={this.state.user_id} user_details={this.state.user_details} handleResultCalculated={this.handleResultCalculated.bind(this)}/>
        </div>
        <div className='col s12 l6'>
          <ResultsComponent results={this.state.results} />
        </div>
      </div>
    )
  }
}
