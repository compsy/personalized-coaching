import React, { Component } from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import { ProgressBar } from 'react-materialize';
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

  queryUserDetails() {
    let user_id = this.state.user_id
    axios.get(__SITE_URL__ + '/details?user_id=' + user_id)
      .then(response => this.setState({user_details: response.data}))
  }

  componentDidMount() {
    axios.get(__SITE_URL__ + '/participants')
      .then(response => this.setState({participants: response.data}))
  } 

  handleParticipantChanged(e) {
    let user_id = e.target.value;
    this.setState({user_id: user_id})
    this.queryUserDetails()
  }

  handleResultCalculated(result) {
    this.setState({results: result})
  }

  render() {
    if (this.state.participants === undefined) {
      return(<ProgressBar />)
    }
    return (
      <div className='row'>
        <p>Complete the form to receive an estimate whether or not the selected participant will reach his or her goal today.</p>
        <div className='col s12 l6'>
          <FieldComponent field_id='treatment_id' field_label='Treatment ID' options={this.state.participants} handlerFunction={this.handleParticipantChanged.bind(this)}/>
          <AlgorithmComponent user_id={this.state.user_id} user_details={this.state.user_details} handleResultCalculated={this.handleResultCalculated.bind(this)}/>
        </div>
        <div className='col s12 l6'>
          <ResultsComponent results={this.state.results} />
        </div>
      </div>
    )
  }
}
