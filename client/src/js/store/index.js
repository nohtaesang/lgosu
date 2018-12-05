import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import penderMiddleware from 'redux-pender/lib/middleware';
import modules from '../modules/index';
import DevTools from '../containers/DevTools';

const store = createStore(
    modules,
    compose(
        applyMiddleware(ReduxThunk, penderMiddleware()),
        DevTools.instrument(),
    ),
);
export default store;
