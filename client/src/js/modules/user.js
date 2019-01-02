import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import axios from 'axios';

const GET_NAVER_LOGIN_URL = 'GET_NAVER_LOGIN_URL';
const CLICK_NAVER_LOGIN = 'CLICK_NAVER_LOGIN';

export const getNaverLoginUrl = () => ({
	type: GET_NAVER_LOGIN_URL,
	payload: axios.get('/naverLogin')
});

// export const clickNaverLogin = url => ({
// 	type: CLICK_NAVER_LOGIN,
// 	payload: axios.get('/naverLoginCallBack', url)
// });

const initialState = {
	email: 'nohtaesang@naver.com',
	money: 20000,
	naverLoginUrl: null
};

export default handleActions(
	{
		...pender({
			type: GET_NAVER_LOGIN_URL,
			onSuccess: (state, action) =>
				// console.log(action.payload.data.naverLoginUrl);
				({ ...state, naverLoginUrl: action.payload.data.naverLoginUrl })
		}),
		...pender({
			type: CLICK_NAVER_LOGIN,
			onSuccess: (state, action) => {
				console.log(action.payload);
				return { ...state };
			}
		})
	},
	initialState
);
