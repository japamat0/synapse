/**
 *
 * A common button, if you pass it a prop "route" it'll render a link to a react-router route
 * otherwise it'll render a link with an onclick
 * 
 * taken from react-boilerplate
 */

import React, { Children } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Link from '../Link';
import A from './A';
import StyledButton from './StyledButton';

const Wrapper = styled.div`
  text-align: center;
`;

function Button(props) {
  // Render an anchor tag
  let button = (
    <A href={props.href} onClick={props.onClick}>
      {Children.toArray(props.children)}
    </A>
  );

  if (props.link) {
    button = (
      <StyledButton>
        <Link to={props.link}>
          {Children.toArray(props.children)}
        </Link>
      </StyledButton>
    )
  }

  // If the Button has a handleRoute prop, we want to render a button
  if (props.handleRoute) {
    button = (
      <StyledButton onClick={props.handleRoute}>
        {Children.toArray(props.children)}
      </StyledButton>
    );
  }

  return <Wrapper>{button}</Wrapper>;
}

Button.propTypes = {
  handleRoute: PropTypes.func,
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Button;