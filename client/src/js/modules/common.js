import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import axios from 'axios';

const MOVE_PAGE = 'MOVE_PAGE';

export const movePage = page => ({
	type: MOVE_PAGE,
	payload: page
});

const initialState = {
	curPage: 'index'
};

export default handleActions(
	{
		[MOVE_PAGE]: (state, action) => {
			const newPage = action.payload;
			return {
				...state,
				curPage: newPage
			};
		}
	},
	initialState
);
