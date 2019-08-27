import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';

import Button from '../../Components/Button';
import { TOGGLE_THEME } from './constants';
import { toggleTheme } from './actions';


const propTypes = {};

const defaultProps = {};

const FooterWrapper = styled.div`
  margin: 3em;
  width: calc(100% - 3em * 2);
  border-top: 1px solid ${props => props.theme.accent};
`;

class Footer extends React.Component {
  render() {
    return (
      <FooterWrapper>
        <Button handleRoute={this.props.toggleTheme}>Toggle Theme</Button>
      </FooterWrapper>
    );
  }
}

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export const mapDispatchToProps = dispatch => ({
  toggleTheme: () => dispatch(toggleTheme()),
})

const connected = connect(
  null,
  mapDispatchToProps,
)

export default compose(connected)(Footer);
