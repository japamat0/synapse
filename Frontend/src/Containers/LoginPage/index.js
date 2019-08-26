import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { loginUser } from './actions';
import { makeSelectLoginLoading, makeSelectLoginError, makeSelectLoginFormView } from './selectors';

import Input from '../../Components/Forms/Input';
import Form from '../../Components/Forms/Form';
import Button from '../../Components/Button';
import Span from '../../Components/Span';
import LoadingIndicator from '../../Components/LoadingIndicator';
import { makeSelectUser } from '../App/selectors';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormWrapper = styled.div`
  min-height: 166px; 
`;

const ButtonWrapper = styled.div`
  padding: 1.5em; 
`;

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleLogin(this.state);
  }

  render() {
    return (
      <Wrapper>
        <h1>login page</h1>
        {this.props.error ? (
            <Span fontSize=".85em" color="rgba(255, 0, 0, 0.6)">
              things broke
            </Span>
        ) : null}
        <Form>
          <FormWrapper>
            {this.props.loading ? (
              <LoadingIndicator />
            ) : (
              <div>
                <Input
                  label="Username"
                  name="username"
                  type="text"
                  value={this.state.username}
                  onChange={this.handleChange}
                  />
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  />
              </div>
            )}
          </FormWrapper>
          <ButtonWrapper>
            <Button disabled={this.props.loading} handleRoute={this.handleSubmit}>Log in</Button>
          </ButtonWrapper>
        </Form>
      </Wrapper>
    );
  }
}

const propTypes = {};
const defaultProps = {};


LoginPage.propTypes = propTypes;
LoginPage.defaultProps = defaultProps;

export const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoginLoading(),
  error: makeSelectLoginError(),
  formView: makeSelectLoginFormView(),
  user: makeSelectUser(),
});

export const mapDispatchToProps = dispatch => ({
  handleLogin: state => dispatch(loginUser(state)),
})

const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(connected)(LoginPage);
