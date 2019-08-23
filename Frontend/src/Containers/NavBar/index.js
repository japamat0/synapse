import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Icon from '../../Components/Icon';
import Span from '../../Components/Span';
import Button from '../../Components/Button';

const propTypes = {};

const defaultProps = {};

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

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <OuterWrapper>
        <InnerWrapper>
          <GroupWrapper>
            <Icon name="logo" height={48} width={48} />
            <Span fontSize="1.75em">Bankly</Span>
          </GroupWrapper>
          <GroupWrapper>
            <Button link="/login">login</Button>
            <Button link="/register">register</Button>
          </GroupWrapper>
        </InnerWrapper>
      </OuterWrapper>
    );
  }
}

 NavBar.propTypes = propTypes;
 NavBar.defaultProps = defaultProps;