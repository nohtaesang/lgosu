import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import match from './match';
import user from './user';
import team from './team';

export default combineReducers({
	match,
	user,
	team,
	pender: penderReducer
});
