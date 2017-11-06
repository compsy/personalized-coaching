import React, { Component } from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import { Col, Row, ProgressBar } from 'react-materialize';
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
      <Row>
        <p>Complete the form to receive an estimate whether or not the selected participant will reach his or her goal today.</p>
        <Col m={12} l={6}>
          <FieldComponent field_id='treatment_id' field_label='Treatment ID' selected={this.state.user_id} options={this.state.participants} handlerFunction={this.handleParticipantChanged.bind(this)}/>
          <AlgorithmComponent user_id={this.state.user_id} user_details={this.state.user_details} handleResultCalculated={this.handleResultCalculated.bind(this)}/>
        </Col>
        <Col m={12} l={6}>
          <ResultsComponent results={this.state.results} />
        </Col>
      </Row>
    )
  }
}
