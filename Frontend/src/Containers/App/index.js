/**
 * APP CONTAINER 
 * should contain content that is to be viewable at all times, e.g. navbar
 */

import React from 'react';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

import NavBar from '../NavBar';
import LoginPage from '../LoginPage';

import PropTypes from 'prop-types';

const propTypes = {};

const defaultProps = {};

const BodyWrapper = styled.div`
  background-color: ${props => props.theme.bg};
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  max-width: 1098px;
  margin: 1em auto;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { theme } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <BodyWrapper>
          <NavBar />
          <ContentWrapper>
            <Switch>
              <Route exact path="/welcome" component={() => <div>welcome page</div>} />
              <Route exact path="/login" component={LoginPage} />
              <Redirect to="/welcome" />
            </Switch>
          </ContentWrapper>
        </BodyWrapper>
      </ThemeProvider>
    );
  }
}

export function mapStateToProps(state, ownProps) {
  const { theme } = state.global;
  return { theme, };
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default connect(mapStateToProps)(App);