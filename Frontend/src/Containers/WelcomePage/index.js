/**
 * Basic Welcome page
 */

import React from 'react';
import styled from 'styled-components';
import H1 from '../../Components/H1';
import Span from '../../Components/Span';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Wrapper>
        <H1 margin="0.25em 0">Welcome to Bankly,</H1>
        <Span>a convenient place to view all your bank accounts.</Span>
      </Wrapper>
    );
  }
}


export default WelcomePage;