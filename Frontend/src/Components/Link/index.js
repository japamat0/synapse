import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const StyledLink = styled(Link)`
  color: ${props => props.theme.color ? props.theme.color : '#000fff'};
  text-decoration: none;

  &:hover {
    opacity: 0.7;
  }

  &:focus, &:visited, &:link, &:active {
      text-decoration: none;
  }
`;

export default StyledLink;