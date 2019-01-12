import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import match from './match';
import user from './user';

export default combineReducers({
	match,
	user,
	pender: penderReducer
});
