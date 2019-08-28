import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import format from './bodyFormatter';
import formToShow from './forms';
import Form from '../../Components/Forms/Form';
import Button from '../../Components/Button';
import Span from '../../Components/Span';
import LoadingIndicator from '../../Components/LoadingIndicator';
import {
  makeSelectRegisterLoading,
  makeSelectRegisterError,
  makeSelectRegisterFormView,
} from './selectors';

import { cycleForm, checkUsername, editForm, registerUser } from './actions';
import registerReducer from './reducer';

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  margin-top: 1.5em;
`;

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      phone: '',
      ip: '',
      firstName: '',
      lastName: '',
      alias: '',
      entity_type: '',
      entity_scope: '',
      birthdate: '',
      address_street: '',
      address_city: '',
      address_subdivision: '',
      address_postal_code: '',
      address_country_code: '',
      facebook: '',
      SSN: '',
      govtId: '',
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    const { formView } = this.props;

    // if all infor has been filled in, submit, else go to next view;
    formView === 'review'
      ? this.props.registerUser(format(this.state))
      : this.props.cycleForm(this.state, formView);
  }

  editForm = idx => {
    this.props.editForm(idx)
  }

  render() {
    const currentForm = formToShow(
      this.props.formView, 
      this.state, 
      this.handleChange, 
      this.editForm,
    );
    return (
      <FormWrapper>
        <h1>Sign up</h1>
        <Span fontSize=".85em" color="rgba(255, 0, 0, 0.6)">
          {this.props.error ? this.props.error.message : null}
        </Span>
        {this.props.loading ? (
          <LoadingIndicator />
        ) : (
          <Form>
            {currentForm}
            <ButtonWrapper>
              <Button handleRoute={this.handleSubmit}>
                {this.props.formView === 'review' ? 'Submit' : 'Next'}
              </Button>
            </ButtonWrapper>
          </Form>
        )}
      </FormWrapper>
    );
  }
}


export const mapStateToProps = createStructuredSelector({
  loading: makeSelectRegisterLoading(),
  error: makeSelectRegisterError(),
  formView: makeSelectRegisterFormView(),
});

export const mapDispatchToProps = dispatch => ({
  cycleForm: (state, formView) => dispatch(cycleForm(state, formView)),
  registerUser: state => dispatch(registerUser(state)),
  checkUsernameAvailable: username => dispatch(checkUsername(username)),
  editForm: idx => dispatch(editForm(idx)),
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(connected)(RegisterPage);
