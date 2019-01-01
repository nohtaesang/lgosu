import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import match from './match';
import common from './common';
import user from './user';

export default combineReducers({
	common,
	match,
	user,
	pender: penderReducer
});
