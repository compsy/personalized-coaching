import React, { Component } from 'react';
import { Row, Input } from 'react-materialize';
import { render } from 'react-dom';

export default class FieldComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: ['Loading...', 'test'],
      selected: 'def'
    }
  }

  generateSelect(items) {
    let selectorOptions = items.map( (option) => {
      return (
        <option key={option}>{option}</option>
      )
    })
    selectorOptions.unshift(<option key="def" value="def" disabled>Choose your option</option>)

    return(selectorOptions)
  }

  updateSelected(props) {
    let selected = props.selected === undefined ? 'def' : props.selected;
    this.setState({
      selected: selected
    })
  }

  componentWillReceiveProps(props) {
    this.updateSelected(props);
  }

  componentDidMount() {
    this.updateSelected(this.props);
    this.setState({
      options: this.props.options,
    })
  }

  render() {
    let options = this.generateSelect(this.state.options);
    return (
      <Row>
        <Input type='select' label={this.props.field_label} value={this.state.selected} 
               onChange={this.props.handlerFunction}>
          {options}
        </Input>
      </Row>
    )
  }
}
