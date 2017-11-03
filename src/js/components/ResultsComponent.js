import React, { Component } from 'react';
import { Row, Input } from 'react-materialize';
import { render } from 'react-dom';

export default class ResultsComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  renderDay(day) {
    day = day + ''
    switch(day) {
        case '0': return 'Sunday'
        case '1': return 'Monday'
        case '2': return 'Tuesday'
        case '3': return 'Wednesday'
        case '4': return 'Thursday'
        case '5': return 'Friday'
        case '6': return 'Saturday'
        default:
    }
  }

  render() {
    if (this.props.results === undefined) {
      return(<div></div>);
    }
    console.log(this.props.results)
    return (
      <div className="row">
        <h4> Prediction: </h4>
        <div>The prediction for this {this.renderDay(this.props.results.day)} is <strong>{this.props.results.prediction}</strong></div>
        <div>(probability: {this.props.results.probability}%).</div>
      </div>
    )
  }
}
