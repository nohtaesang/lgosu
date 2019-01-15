import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import axios from 'axios';

const SET_TEAM_INFO = 'SET_TEAM_INFO';
export const setTeamInfo = teamInfo => ({
	type: SET_TEAM_INFO,
	payload: teamInfo
});

const initialState = {
	teamInfo: []
};

export default handleActions(
	{
		[SET_TEAM_INFO]: (state, action) => ({
			...state,
			teamInfo: action.payload
		})
	},
	initialState
);
