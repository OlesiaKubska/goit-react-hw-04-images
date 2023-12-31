import React from 'react';
import PropTypes from 'prop-types';
import { StyledButton} from './Button.styled';

const Button = ({ onClick, children }) => {
    return <StyledButton onClick={onClick}>{children}</StyledButton>
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Button;