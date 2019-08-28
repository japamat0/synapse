/**
 * Component to render account details for the user
 */

import styled from 'styled-components';

import React, { Component } from 'react'
import Span from '../Span';
import H3 from '../H3';

class AccountDetail extends Component {
  constructor(props) {
    super(props)
  }

  
  render() {
    const { bank_name, balance } = this.props.info;
    return (
      <div>
        <H3>{this.props.info.class}<small> {this.props.info.account_num}</small></H3>
        <Span>{bank_name}</Span>
        <div>${balance.amount}</div>
      </div>
    )
  }
}


export default AccountDetail;