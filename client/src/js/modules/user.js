import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import axios from 'axios';

const SET_TOKEN = 'SET_TOKEN';
const SET_EMAIL = 'SET_EMAIL';

export const setToken = token => ({
	type: SET_TOKEN,
	payload: token
});

export const setEmail = email => ({
	type: SET_EMAIL,
	payload: email
});

const initialState = {
	email: null,
	money: null,
	isLogin: false,
	token: null
};

export default handleActions(
	{
		[SET_TOKEN]: (state, action) => ({
			...state,
			token: action.payload
		}),
		[SET_EMAIL]: (state, action) => ({
			...state,
			email: action.payload
		})
	},
	initialState
);
