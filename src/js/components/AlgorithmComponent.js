import React, { Component } from 'react';
import { ProgressBar, Row, Input } from 'react-materialize';
import { render } from 'react-dom';
import axios from 'axios';
import FieldComponent from './FieldComponent.js'

export default class AlgorithmComponent extends React.Component {
  constructor(props) {
    super(props)

    // Bounded hours only
    const start_hour = 8;
    const end_hour = 18;

    let d = new Date();
    let hour = Math.min(Math.max(d.getHours(),start_hour),end_hour); 
    this.state = {
      selectedOption: 'f1',
      totalSteps: 1000,
      lastHourSteps: 100,
      showAdvanced: false,
      hour: hour,
      algo_f1: undefined,
      algo_acc: undefined
    }
  }

  componentDidMount() {
    this.updateAlgorithmSelection(this.props.user_details)
  }

  componentWillReceiveProps(props) {
    this.updateAlgorithmSelection(props.user_details)
  }

  generate(items) {
    let selectorOptions = items.map( (option) => {
      return (
        <option key={option}>{option}</option>
      )
    })
    return(selectorOptions)
  }

  onOptionChange(e) {
    this.setState({
      selectedOption: e.target.value
    });
  }
  onLastHourStepsChange(e) {
    this.setState({
      lastHourSteps: e.target.value
    });
  }
  onTotalStepsChange(e) {
    this.setState({
      totalSteps: e.target.value
    });
  }

  onHourChange(e) {
    this.setState({
      hour: e.target.value
    });
  }

  submitField() {
    axios.post(__SITE_URL__ + '/calculate', {
      treatment_id: this.props.user_id,
      hour: this.state.hour,
      steps_hour: this.state.lastHourSteps,
      steps_total: this.state.totalSteps,
      algorithm: this.bestAlgo(),
    }).then(response => this.props.handleResultCalculated(response.data))
  }

  toggleAdvanced() {
    let adv = this.state.showAdvanced
    this.setState({showAdvanced: !adv})
  }

  onAlgorithmChanged(e) {
    // Force the new algorithm
    this.setState({
      algo_f1: e.target.value,
      algo_acc: e.target.value
    })
  }

  getAlgorithmOptions(user_details) {
    if(user_details != undefined) {
      return(user_details.map((entry) => entry.algorithm));
    }
  }

  bestAlgo() {
    if(this.state.selectedOption === 'f1')
      return this.state.algo_f1
    return this.state.algo_acc
  }

  createSelect(id, label, defaultVal, data, callback, useIndex) {
    var key;
    data = data.map( (entry, index) => {
      key = useIndex ? index : entry
      return (
        <option value={key} key={key}>{entry}</option>
      )
    });
    return(
      <Input type='select' id={id} label={label}
              defaultValue={defaultVal} 
              onChange={callback}>
        {data}
      </Input>
    )
  }

  renderAdvancedOptions(user_details) {
    return(
      <div>
    <Row>
      {this.createSelect('hour', 'Current hour', this.state.hour,[8,9,10,11,12,13,14,15,16,17,18],this.onHourChange.bind(this), false)}
    </Row>
        <FieldComponent field_id='treatment_id' field_label='Algorithm' selected={this.bestAlgo()} options={this.getAlgorithmOptions(user_details)} handlerFunction={this.onAlgorithmChanged.bind(this)}/>
    </div>
    )
  }

  updateAlgorithmSelection(user_details) {
    // Inefficient, but clean
    if(user_details != undefined) {
      let algo_f1 = user_details.reduce(function(prev, curr) { return prev.f1_score > curr.f1_score ? prev : curr; });
      let algo_acc = user_details.reduce(function(prev, curr) { return prev.accuracy > curr.accuracy ? prev : curr; });
      this.setState({
        algo_f1: algo_f1.algorithm,
        algo_acc: algo_acc.algorithm
      })
    }
  }


  render() {
    if (this.props.user_details === undefined) {
      return(<span></span>);
    }
    return (
      <div className="row">
        <div className="input-field col s12">
          <Row>
            <span>The daily goal of this participant is {this.props.user_details[0].threshold} steps</span>
          </Row>
          <Row>
            <Input id='steps_total' s={6} label='Steps total' defaultValue={this.state.totalSteps} onChange={this.onTotalStepsChange.bind(this)} />
          </Row>
          <Row>
            <Input id='steps_hour' s={6} label='Steps in the last hour' defaultValue={this.state.lastHourSteps} onChange={this.onLastHourStepsChange.bind(this)} />
          </Row>
          <Row>
            Select best algorithm based on
          </Row>
          <Row>
            <Input id='f1' name='group1' type='radio' value='f1' label='F1-score' checked={this.state.selectedOption === 'f1'} onChange={this.onOptionChange.bind(this)} />
            <Input id='acc' name='group1' type='radio' value='accuracy' label='Accuracy' checked={this.state.selectedOption === 'accuracy'} onChange={this.onOptionChange.bind(this)} />
          </Row>
          {this.state.showAdvanced ? this.renderAdvancedOptions(this.props.user_details) : null }
          <Row>
            <Input type='submit' defaultValue='Predict' className='btn' onClick={this.submitField.bind(this)}/>
          </Row>
          <a onClick={this.toggleAdvanced.bind(this)}>Advanced options </a>
        </div>
      </div>
    )
  }
}
