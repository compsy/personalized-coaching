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

    return(selectorOptions)
  }

  componentDidMount() {
    let selected = this.props.selected === undefined ? 'def' : this.props.selected;
    this.setState({
      options: this.props.options,
      selected: selected
    })
  }

  render() {
    let options = this.generateSelect(this.state.options);
    options.unshift(<option key="def" value="def" disabled>Choose your option</option>)
    console.log(this.state.selected);
    return (
      <Row>
        <Input type='select' 
               label={this.props.field_label} 
               defaultValue={this.state.selected} 
               onChange={this.props.handlerFunction}>
          {options}
        </Input>
      </Row>
    )
  }
}
