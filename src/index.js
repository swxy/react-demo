/**
 * Created by swxy on 2017/4/1.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import {AppContainer} from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

import Loop from './loop';
import Test from './test';

const Comp = {Loop, Test};

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component/>
        </AppContainer>,
        document.getElementById('app')
    );
};

// get which component should render
const comp = () => {
    let p = window.location.hash.slice(1);
    if (!p) {
        console.log('not found component');
        return false;
    }
    p = p[0].toUpperCase() + p.slice(1);
    if (Comp[p]) {
        return Comp[p];
    }
    else {
        console.log('not found component');
        return false;
    }
}

comp() && render(comp());

window.addEventListener('hashchange', (e) => {
    console.log('hash change && update component');
    comp() && render(comp());
});

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
