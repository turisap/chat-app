import React from 'react';
import propTypes from 'prop-types';

/**
 * This component is responsible for rendering a single button
 * @param props
 * @returns {*}
 * @constructor
 */
const Button = props => (
    <button onClick={props.buttonClickHandler}>
        {props.title}
    </button>
);

Button.propTypes = {
    title : propTypes.string.isRequired,
    buttonClickHandler : propTypes.func
};


export default Button;