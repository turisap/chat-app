import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import './styles/styles.scss';




// setting global debug flag to true (for development only)
window.DEBUG = true;


/* The if statement is required so as to Render the component on pages that have a div with an ID of "app";
*/

if (document.getElementById('app')) {
    ReactDOM.render(<Main />, document.getElementById('app'));
}