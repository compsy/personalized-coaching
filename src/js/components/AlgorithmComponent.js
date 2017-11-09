import React, { Component } from 'react';
import { ProgressBar, Row, Input } from 'react-materialize';
import { render } from 'react-dom';
import axios from 'axios';
import FieldComponent from './FieldComponent.js'

export default class AlgorithmComponent extends React.Component {
  constructor(props) {
    super(props)

    // Bounded hours only
    const end_hour = 10;

    let d = new Date();
    let hour = Math.min(d.getHours()-8,end_hour); 
    this.state = {
      selectedOption: 'f1',
      totalSteps: 1000,
      lastHourSteps: 100,
      showAdvanced: false,
      hour: hour,
      selectedAlgo: undefined,
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
      hour: parseInt(e.target.value)
    });
  }

  getCurrentAlgorithm() {
    console.log(this.state.selectedAlgo);
    if (this.state.selectedAlgo === undefined) {
      return(this.bestAlgo());
    }
    return(this.state.selectedAlgo);
  }

  submitField() {
    axios.post(__SITE_URL__ + '/calculate', {
      treatment_id: this.props.user_id,
      hour: this.state.hour + 8, // We remove 8 hours first
      steps_hour: this.state.lastHourSteps,
      steps_total: this.state.totalSteps,
      algorithm: this.getCurrentAlgorithm(),
    }).then(response => this.props.handleResultCalculated(response.data))
  }

  toggleAdvanced() {
    let adv = this.state.showAdvanced
    this.setState({showAdvanced: !adv})
  }

  onAlgorithmChanged(e) {
    // Force the new algorithm
    this.setState({
      selectedAlgo: e.target.value
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
      <Input s={12} type='select' id={id} label={label}
              defaultValue={defaultVal} 
              onChange={callback}>
        {data}
      </Input>
    )
  }

  renderPerformanceMeasure() {
    if(this.state.selectedOption === 'f1') {
      return(<span>F1-score</span>);
    }
    return(<span>accuracy</span>);
  }

  renderAdvancedOptions(user_details) {
    return(
    <div>
      <FieldComponent field_id='treatment_id' field_label='Algorithm' selected={this.getCurrentAlgorithm()} options={this.getAlgorithmOptions(user_details)} handlerFunction={this.onAlgorithmChanged.bind(this)}/>
      Select best algorithm based on
      <Row>
        <Input id='f1' name='group1' type='radio' value='f1' label='F1-score' checked={this.state.selectedOption === 'f1'} onChange={this.onOptionChange.bind(this)} />
        <Input id='acc' name='group1' type='radio' value='accuracy' label='Accuracy' checked={this.state.selectedOption === 'accuracy'} onChange={this.onOptionChange.bind(this)} />
      </Row>
      (the best algorithm based on {this.renderPerformanceMeasure()} is the {this.bestAlgo()} algorithm)
    </div>
    )
  }

  updateAlgorithmSelection(user_details) {
    // Inefficient, but clean
    if(user_details != undefined) {
      let algo_f1 = user_details.reduce(function(prev, curr) { return prev.f1_score > curr.f1_score ? prev : curr; });
      let algo_acc = user_details.reduce(function(prev, curr) { return prev.accuracy > curr.accuracy ? prev : curr; });
      this.setState({
        selectedAlgo: this.getCurrentAlgorithm(),
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
      <div>
        <span>The daily goal of this participant is {this.props.user_details[0].threshold} steps</span>
        <Input id='steps_total' s={12} label='Steps in total (today)' defaultValue={this.state.totalSteps} onChange={this.onTotalStepsChange.bind(this)} />
        <Input id='steps_hour' s={12} label='Steps during the last hour' defaultValue={this.state.lastHourSteps} onChange={this.onLastHourStepsChange.bind(this)} />
        {this.createSelect('hour', 'Current time in hours', this.state.hour, ['8:00','9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'], this.onHourChange.bind(this), true)}
        {this.state.showAdvanced ? this.renderAdvancedOptions(this.props.user_details) : null }
        <Row>
          <Input type='submit' defaultValue='Predict' className='btn' onClick={this.submitField.bind(this)}/>
        </Row>
        <a onClick={this.toggleAdvanced.bind(this)}>{this.state.showAdvanced ? 'Less' : 'More' } coaching options...</a>
      </div>
    )
  }
}
