import React from 'react';
import styled from 'styled-components';
import Span from '../Span';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.25em;
`;

const InputWrapper = styled.input`
  font-size: 1.25em;
  background-color: transparent;
  border-bottom: 1px solid ${props => props.theme.accent};
  border-top: none;
  border-left: none;
  border-right: none;
  min-width: 300px;

  &:focus {
    outline: none;
  }
`;

const Input = props => (
  <Wrapper>
    <Span fontSize="0.9em" color="#6b6b6b"> {props.label}</Span>
    <InputWrapper {...props} />
  </Wrapper>
)

export default Input;