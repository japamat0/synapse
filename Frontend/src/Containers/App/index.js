/**
 * APP CONTAINER 
 * should contain content that is to be viewable at all times, e.g. navbar
 */

import React from 'react';
import { connect } from 'react-redux';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

import NavBar from '../NavBar';
import LoginPage from '../LoginPage';
import RegisterPage from '../RegisterPage';
import Footer from '../Footer';

import { createStructuredSelector } from 'reselect';
import { makeSelectAppTheme } from './selectors';
import WelcomePage from '../WelcomePage';
import AccountsPage from '../AccountsPage';


const BodyWrapper = styled.div`
  background-color: ${props => props.theme.bg};
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  max-width: 1098px;
  margin: 1em auto;
`;

const GlobalStyle = createGlobalStyle`
  body {
    color: ${props => props.theme.color};
    font-family: Arial, Helvetica, sans-serif;
    background-color: ${props => props.theme.bg}
  }
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
        <GlobalStyle />
          <NavBar />
          <ContentWrapper>
            <Switch>
              <Route exact path="/welcome" component={WelcomePage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/accounts" component={AccountsPage} />
              <Redirect to="/welcome" />
            </Switch>
            <Footer />
          </ContentWrapper>
        </BodyWrapper>
      </ThemeProvider>
    );
  }
}

export const mapStateToProps = createStructuredSelector({
  theme: makeSelectAppTheme(),
})


export default connect(mapStateToProps)(App);