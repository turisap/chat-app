import React from 'react';
import propTypes from 'prop-types';

/**
 * This component is responsible for rendering a single button
 * @param props
 * @returns {*}
 * @constructor
 */
const Button = props => (
    <button onClick={props.buttonClickHandler} className={props.class}>
        {props.title}
    </button>
);

Button.propTypes = {
    title : propTypes.string.isRequired,
    buttonClickHandler : propTypes.func,
    class : propTypes.string
};


export default Button;