import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Icon from '../../Components/Icon';
import Span from '../../Components/Span';
import Button from '../../Components/Button';
import { createStructuredSelector } from 'reselect';
import { makeSelectAppTheme, makeSelectUsername } from '../App/selectors';
import { logoutUser } from '../LoginPage/actions';
import { compose } from 'redux';


const OuterWrapper = styled.div`
  padding: 0.75em;
  width: 100vw;
  background-color: ${props => props.theme.accent};
`;

const GroupWrapper = styled.div`
  display: flex;
  align-items: center;
`;


const InnerWrapper = styled.div`
  color: ${props => props.theme.color};
  margin: 0 auto;
  max-width: 1098px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }



  render() {
    return (
      <OuterWrapper>
        <InnerWrapper>
          <GroupWrapper>
            <Icon name="logo" fill={this.props.theme.color} height={48} width={48} />
            <Span fontSize="1.75em" color ={this.props.theme.color}>Bankly</Span>
          </GroupWrapper>
          {this.props.username ? (
            <Button handleRoute={this.props.logout}>Log Out</Button>
            ) : (
            <GroupWrapper>
              <Button link="/login">login</Button>
              <Button link="/register">register</Button>
            </GroupWrapper>
          )}
        </InnerWrapper>
      </OuterWrapper>
    );
  }
}


export const mapStateToProps = createStructuredSelector({
  theme: makeSelectAppTheme(),
  username: makeSelectUsername(),
})

export const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser()),
})

const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(connected)(NavBar)
