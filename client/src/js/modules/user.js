import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import axios from 'axios';

const GET_NAVER_LOGIN_URL = 'GET_NAVER_LOGIN_URL';
const GET_USER_INFO_FROM_NAVER = 'GET_USER_INFO_FROM_NAVER';
const GET_USER_INFO_FROM_DB = 'GET_USER_INFO_FROM_DB';
const CLICK_LOGOUT = 'CLICK_LOGOUT';
const CHANGE_USER_MONEY = 'CHANGE_USER_MONEY';

export const getNaverLoginUrl = () => ({
	type: GET_NAVER_LOGIN_URL,
	payload: axios.get('/user/naverLogin')
});

export const getUserInfoFromNaver = token => ({
	type: GET_USER_INFO_FROM_NAVER,
	payload: axios.post('/getUserInfoFromNaver', {
		token
	})
});
export const getUserInfoFromDB = userEmail => ({
	type: GET_USER_INFO_FROM_DB,
	payload: axios.post('/getUserInfoFromDB', {
		userEmail
	})
});
export const clickLogout = () => ({
	type: CLICK_LOGOUT
});

export const changeUserMoney = (userEmail, money) => ({
	type: CHANGE_USER_MONEY,
	payload: axios.post('/changeUserMoney', {
		userEmail,
		money
	})
});

const initialState = {
	naverLoginUrl: null,
	userEmail: null,
	userMoney: null
};

export default handleActions(
	{
		[CLICK_LOGOUT]: (state, action) => ({
			...state,
			userEmail: null,
			money: null
		}),
		...pender({
			type: GET_NAVER_LOGIN_URL,
			onSuccess: (state, action) => ({ ...state, naverLoginUrl: action.payload.data.naverLoginUrl })
		}),
		...pender({
			type: GET_USER_INFO_FROM_NAVER,
			onSuccess: (state, action) => ({ ...state, userEmail: action.payload.data.response.email })
		}),
		...pender({
			type: GET_USER_INFO_FROM_DB,
			onSuccess: (state, action) => ({ ...state, userMoney: action.payload.data.money })
		}),
		...pender({
			type: CHANGE_USER_MONEY,
			onSuccess: (state, action) => ({ ...state, userMoney: action.payload.data.money })
		})
	},
	initialState
);
