import React, { Component } from 'react';
import { Row, Input } from 'react-materialize';
import { render } from 'react-dom';

export default class FieldComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: ['Loading...', 'test']
    }
  }

  generateSelect(items) {
    let selectorOptions = items.map( (option) => {
      return (
        <option key={option}>{option}</option>
      )
    })
    return(selectorOptions)
  }

  componentDidMount() {
    this.setState({
      options: this.props.options,
      selected: this.props.selected
    })
  }

  render() {
    let options = this.generateSelect(this.state.options);
    return (
      <Row>
        <Input type='select' 
               label={this.props.field_label} 
               defaultValue={this.props.selected} 
               onChange={this.props.handlerFunction}>
          {options}
        </Input>
      </Row>
    )
  }
}
