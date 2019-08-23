import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { loginUser } from './actions';
import Input from '../../Components/Forms/Input';
import Form from '../../Components/Forms/Form';
import Button from '../../Components/Button';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  padding: 1em; 
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
    console.log('got to handleSubmit');
    
    this.props.handleLogin(this.state);
  }

  render() {
    return (
      <Wrapper>
        <h1>login page</h1>
        <Form>
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
          <ButtonWrapper>
            <Button handleRoute={this.handleSubmit}>submit</Button>
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

export const mapDispatchToProps = dispatch => ({
  handleLogin: state => dispatch(loginUser(state)),
})

const connected = connect(
  null,
  mapDispatchToProps,
)

export default compose(connected)(LoginPage);
