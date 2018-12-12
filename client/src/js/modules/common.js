import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import axios from 'axios';

const MOVE_PAGE = 'MOVE_PAGE';
const TOGGLE_IS_ADMIN = 'TOGGLE_IS_ADMIN';

export const movePage = page => ({
	type: MOVE_PAGE,
	payload: page
});

export const toggleIsAdmin = () => ({
	type: TOGGLE_IS_ADMIN
});

const initialState = {
	curPage: 'index',
	isLogin: false,
	user: {
		email: 'nohtaesang@naver.com',
		money: 24053000
	},
	isAdmin: false
};

export default handleActions(
	{
		[MOVE_PAGE]: (state, action) => {
			const newPage = action.payload;
			return {
				...state,
				curPage: newPage
			};
		},
		[TOGGLE_IS_ADMIN]: (state, action) => {
			const { isAdmin } = state;
			console.log(state);
			return {
				...state,
				isAdmin: !isAdmin
			};
		}
	},
	initialState
);
