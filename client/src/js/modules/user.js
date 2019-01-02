import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import axios from 'axios';

const SET_EMAIL = 'SET_EMAIL';

export const setEmail = email => ({
	type: SET_EMAIL,
	payload: email
});

const initialState = {
	email: null,
	money: null,
	isLogin: false
};

export default handleActions(
	{
		[SET_EMAIL]: (state, action) => ({
			...state,
			email: action.payload.email
		})
	},
	initialState
);
