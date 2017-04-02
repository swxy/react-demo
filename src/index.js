/**
 * Created by swxy on 2017/4/1.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import {AppContainer} from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

import Loop from './loop';

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component/>
        </AppContainer>,
        document.getElementById('app')
    );
};

render(Loop);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept();
    /*
    module.hot.accept('./loop', () => {
        // const NextLoop = require('./loop').default;
        // render(NextLoop)
        render(Loop);
    });*/
}
