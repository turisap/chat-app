import React from 'react';
import {Provider} from 'react-redux';

import RouterContainer from '../containers/RouterContainer';
import store from '../store/Store';

/* An example React component */
const Main = () => (
    <Provider store={store()}>
        <RouterContainer/>
    </Provider>
);

export default Main;