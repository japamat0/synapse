import styled from 'styled-components';

const Span = styled.span`
  font-size: ${props => (props.fontSize || '1em')};
  color: ${props => (props.color ? props.color : props.theme.label)};
`;

export default Span;