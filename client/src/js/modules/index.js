import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import match from './match';

export default combineReducers({
    match,
    pender: penderReducer,
});
