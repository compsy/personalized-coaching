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

  renderAdvice(adviceIsPositive) {
    if (adviceIsPositive) return(<Row> No need to intervene now.</Row>)
    return(<Row>It is probably wise to consider an intervention.</Row>)
  }

  render() {
    if (this.props.results === undefined) {
      return(<div></div>);
    }
    console.log(this.props.results)
    let adviceIsPositive = this.props.results.prediction !== 'negative';
    return (
      <div className="row">
        <Row>
          <h4> Prediction: </h4>
          The prediction for this participant at {this.props.results.hour}:00 to reach his or her goal by 19:00 is <strong>{this.props.results.prediction}</strong> 
          <span> (we {adviceIsPositive ? null : "don't" } expect this person to reach his or her goal, with a certainty of {this.props.results.probability}%).</span>
        </Row>
        {this.renderAdvice(adviceIsPositive)}
      </div>
    )
  }
}
