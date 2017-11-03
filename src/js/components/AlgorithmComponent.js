import React, { Component } from 'react';
import { Row, Input } from 'react-materialize';
import { render } from 'react-dom';
import FieldComponent from './FieldComponent.js'

export default class AlgorithmComponent extends React.Component {
  constructor(props) {
    super(props)
    let d = new Date();
    let day = d.getDay();
    let hour = d.getHours();
    this.state = {
      selectedOption: 'f1',
      totalSteps: 1000,
      lastHourSteps: 100,
      showAdvanced: false,
      day: day,
      hour: hour,
      algo_f1: undefined,
      algo_acc: undefined
    }
  }

  componentDidMount() {
    this.updateAlgorithmSelection(this.props.user_details)
  }

  componentWillReceiveProps(props) {
    console.log(props)
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
      selectorOption: e.target.value
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
  onDayChange(e) {
    this.setState({
      day: e.target.value
    });
  }
  onHourChange(e) {
    this.setState({
      hour: e.target.value
    });
  }

  submitField() {
    console.log(this.props)
    axios.post('http://localhost:5000/calculate', {
      treatment_id: this.props.user_id,
      day: this.state.day,
      hour: this.state.hour,
      steps_hour: this.state.lastHourSteps,
      steps_total: this.state.totalSteps,
      algorithm: this.bestAlgo(),
    }).then(response => this.props.handleResultCalculated(response.data))
  }

  createSubmit() {
    return(<Row>
      <Input type='submit' className='btn' onClick={this.submitField.bind(this)}/>
    </Row>)
  }

  toggleAdvanced() {
    let adv = this.state.showAdvanced
    this.setState({showAdvanced: !adv})
  }

  onAlgorithmChanged(e) {
    // Force the new algorithm
    console.log('Changing algorithm!');
    this.setState({
      algo_f1: e.target.value,
      algo_acc: e.target.value
    })
  }

  getAlgorithmOptions(user_details) {
    console.log(this);
    console.log(user_details);
    if(user_details != undefined) {
      return(user_details.map((entry) => entry.algorithm));
    }
  }

  bestAlgo() {
    console.log('best' + this.state.algo_f1);
    if(this.state.selectedOption === 'f1')
      return this.state.algo_f1
    return this.state.algo_acc
  }

  renderAdvancedOptions(user_details) {
    return(
      <div>
    <Row>
      <Input id='day' s={6} label='Current day' defaultValue={this.state.day} onChange={this.onDayChange.bind(this)} />
    </Row>
    <Row>
      <Input id='hour' s={6} label='Current hour' defaultValue={this.state.hour} onChange={this.onHourChange.bind(this)} />
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
      console.log(algo_f1);
      this.setState({
        algo_f1: algo_f1.algorithm,
        algo_acc: algo_acc.algorithm
      })
    }
  }


  render() {
    if (this.props.user_details === undefined) {
     return(<div></div>);
    }
    return (
      <div className="row">
        <div className="input-field col s12">
          <Row>
            <Input id='steps_total' s={6} label='Steps total' defaultValue={this.state.totalSteps} onChange={this.onTotalStepsChange.bind(this)} />
          </Row>
          <Row>
            <Input id='steps_hour' s={6} label='Steps in the last hour' defaultValue={this.state.lastHourSteps} onChange={this.onLastHourStepsChange.bind(this)} />
          </Row>
          <Row>
            <Input id='f1' name='group1' type='radio' value='f1' label='F1-score' checked={this.state.selectedOption === 'f1'} onChange={this.onOptionChange.bind(this)} />
            <Input id='acc' name='group1' type='radio' value='accuracy' label='Accuracy' checked={this.state.selectedOption === 'accuracy'} onChange={this.onOptionChange.bind(this)} />
          </Row>
          {this.state.showAdvanced ? this.renderAdvancedOptions(this.props.user_details) : null }
          {this.createSubmit()}
          <a onClick={this.toggleAdvanced.bind(this)}>Advanced options </a>
        </div>
      </div>
    )
  }
}
