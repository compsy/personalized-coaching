import React, { Component } from 'react';
import { Container, Row, Section } from 'react-materialize';
import { render } from 'react-dom';
import UserInput from './components/UserInput.js'

export default class App extends React.Component {
  render() {
    return (
      <Container className="center">
        <h1 className="header center teal-text center text-lighten-2 hide-on-small-only">Personalized coach</h1>
        <h4 className="header center teal-text center text-lighten-2 show-on-small-only hide-on-med-and-up">Personalized coach</h4>
        <div className="section no-pad-bot">
          <Container>
            <Row>
              <h5 className="header col s12 light center flow-text">
                A state of the art, machine learning based tool to <em>personalize</em> coaching.
              </h5>
            </Row>
          </Container>
        </div>
        <Section>
          <UserInput />
        </Section>
      </Container>
    );
  }
};

render(
  <App />,
  document.getElementById('app')
);
