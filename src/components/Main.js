import React from 'react';
import {Provider} from 'react-redux';

import Router from './Router';
import store from '../store/Store';

/* An example React component */
const Main = () => (
    <Provider store={store()}>
        <Router/>
    </Provider>
);

export default Main;