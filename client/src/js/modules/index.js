import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import match from './match';
import common from './common';

export default combineReducers({
	common,
	match,
	pender: penderReducer
});
