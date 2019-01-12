import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import axios from 'axios';

// 네이버 로그인 URL을 가져온다.
const GET_NAVER_LOGIN_URL = 'GET_NAVER_LOGIN_URL';
export const getNaverLoginUrl = () => ({
	type: GET_NAVER_LOGIN_URL,
	payload: axios.get('/user/getNaverLoginUrl')
});

// 토큰을 이용하여 Naver에서 유저에 대한 정보를 가져온다.
const GET_USER_INFO_FROM_NAVER = 'GET_USER_INFO_FROM_NAVER';
export const getUserInfoFromNaver = token => ({
	type: GET_USER_INFO_FROM_NAVER,
	payload: axios.post('/user/getUserInfoFromNaver', {
		token
	})
});

// 이메일을 이용하여 MongoDB에서 유저에 대한 정보를 가져온다
const GET_USER_INFO_FROM_DB = 'GET_USER_INFO_FROM_DB';
export const getUserInfoFromDB = userEmail => ({
	type: GET_USER_INFO_FROM_DB,
	payload: axios.post('/user/getUserInfoFromDB', {
		userEmail
	})
});

// 유저 관련 정보를 초기화 시킨다.
const CLICK_LOGOUT = 'CLICK_LOGOUT';
export const clickLogout = () => ({
	type: CLICK_LOGOUT
});

// update
const UPDATE_USER = 'UPDATE_USER';
export const updateUser = (userEmail, update) => ({
	type: UPDATE_USER,
	payload: axios.post('/user/updateUser', {
		userEmail,
		update
	})
});

// 유저의 돈을 증가시킨다.
const CHANGE_USER_MONEY = 'CHANGE_USER_MONEY';
export const changeUserMoney = (userEmail, money) => ({
	type: CHANGE_USER_MONEY,
	payload: axios.post('/user/changeUserMoney', {
		userEmail,
		money
	})
});

// 유저가 참여한 배팅을 삽입한다.
const INSERT_BETTING_LIST = 'INSERT_BETTING_LIST';
export const insertBettingList = (userEmail, id) => ({
	type: INSERT_BETTING_LIST,
	payload: axios.post('/user/insertBettingList', {
		userEmail,
		id
	})
});

// 유저가 취소한 배팅을 삭제한다
const DELETE_BETTING_LIST = 'DELETE_BETTING_LIST';
export const deleteBettingList = (userEmail, id) => ({
	type: DELETE_BETTING_LIST,
	payload: axios.post('/user/deleteBettingList', {
		userEmail,
		id
	})
});

const initialState = {
	naverLoginUrl: null,
	userInfoFromNaver: null,
	userMoney: null
};

export default handleActions(
	{
		[CLICK_LOGOUT]: (state, action) => ({
			...state,
			userInfoFromNaver: null,
			userMoney: null
		}),
		...pender({
			type: GET_NAVER_LOGIN_URL,
			onSuccess: (state, action) => ({ ...state, naverLoginUrl: action.payload.data.naverLoginUrl })
		}),
		...pender({
			type: GET_USER_INFO_FROM_NAVER,
			onSuccess: (state, action) => ({ ...state, userInfoFromNaver: action.payload.data.response })
		}),
		...pender({
			type: GET_USER_INFO_FROM_DB,
			onSuccess: (state, action) => ({ ...state, userMoney: action.payload.data.userMoney })
		}),
		...pender({
			type: UPDATE_USER,
			onSuccess: (state, action) => ({ ...state, userMoney: action.payload.data.update.userMoney })
		}),
		...pender({
			type: CHANGE_USER_MONEY,
			onSuccess: (state, action) => ({ ...state })
		}),
		...pender({
			type: INSERT_BETTING_LIST,
			onSuccess: (state, action) => ({ ...state })
		}),
		...pender({
			type: DELETE_BETTING_LIST,
			onSuccess: (state, action) => ({ ...state })
		})
	},
	initialState
);
