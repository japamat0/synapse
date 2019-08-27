import React from 'react';
import styled from 'styled-components';
import Span from '../Span';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.25em;
`;

const SelectWrapper = styled.select`
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
    <Span fontSize="0.9em"> {props.label}</Span>
    <SelectWrapper {...props} >
      <option key={`${props.name}-empty`} value={''}>{' '}</option>
      {props.options.map((option, i) => (
        <option key={`${props.name}-${option}`} value={option}>{option}</option>
      ))}
    </SelectWrapper>
  </Wrapper>
)

export default Input;