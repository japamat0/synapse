import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectUser } from '../App/selectors';
import { getAccounts } from './actions';
import H1 from '../../Components/H1';
import LoadingIndicator from '../../Components/LoadingIndicator';
import AccountDetail from '../../Components/AccountDetail';
import {
  makeSelectAccounts,
  makeSelectAccountsLoading,
  makeSelectAccountsError
} from './selectors';


class AccountsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentDidMount() {
    this.props.getAccounts();
  }


  render() {
    const { firstName, lastName } = this.props.user;
    return (
      <React.Fragment>
        <H1>Accounts.</H1>
        <div>Welcome {firstName}!</div>

        { !this.props.accounts ? (
          <LoadingIndicator />
        ) : (
          <div>
            {this.props.accounts.map(acct => <AccountDetail key={acct._id} {...acct} /> )}
          </div>
        ) }
      </React.Fragment>
    );
  }
}


export const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  accounts: makeSelectAccounts(),
  loading: makeSelectAccountsLoading(),
  error: makeSelectAccountsError(),
})

export const mapDispatchToProps = dispatch => ({
  getAccounts: () => dispatch(getAccounts()),
})

const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(connected)(AccountsPage);
