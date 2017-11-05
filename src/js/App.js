import React, { Component } from 'react';
import { render } from 'react-dom';
import UserInput from './components/UserInput.js'

export default class App extends React.Component{
  render() {
    return (
      <div>
        <UserInput />
      </div>
    );
  }
};

render(
  <App />,
  document.getElementById('app')
);
