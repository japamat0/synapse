/**
 * Icon component takes name prop and returns different svg based on name
 */

import React from 'react';
import Logo from './Logo';

const Icon = props => {
  switch (props.name) {
    case "logo":
      return <Logo { ...props } />;
  }
}

export default Icon;