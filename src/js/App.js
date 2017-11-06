import React, { Component } from 'react';
import { Container } from 'react-materialize';
import { render } from 'react-dom';
import UserInput from './components/UserInput.js'

export default class App extends React.Component{
  render() {
    return (
      <Container>
        <div className="section no-pad-bot">
          <div className="container">
            <h1 className="header center teal-text text-lighten-2">Personalized coach</h1>
            <div className="row center">
              <h5 className="header col s12 light">A state of the art, machine learning based tool to <em>personalize</em> coaching.</h5>
            </div>
          </div>
        </div>
        <div className="section">
          <UserInput />
        </div>
      </Container>
    );
  }
};

render(
  <App />,
  document.getElementById('app')
);
