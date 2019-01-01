import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import axios from 'axios';

const ADD_MATCH = 'ADD_MATCH';
const GET_MATCH_LIST = 'GET_MATCH_LIST';
const SET_MATCH_OPTION = 'SET_MATCH_OPTION';
const RESET_NUMBER_OF_MATCHES = 'RESET_NUMBER_OF_MATCHES';
const GET_MORE_MATCH_LIST = 'GET_MORE_MATCH_LIST';
const DELETE_MATCH = 'DELETE_MATCH';
const UPDATE_MATCH = 'UPDATE_MATCH';

const BETTING = 'BETTING';

export const setMatchOption = (option) => ({
	type: SET_MATCH_OPTION,
	payload: option
});

export const resetNumberOfMatches = () => ({
	type: RESET_NUMBER_OF_MATCHES
});

export const getMoreMatchList = () => ({
	type: GET_MORE_MATCH_LIST
});

export const addMatch = (category, newDate, home, away) => ({
	type: ADD_MATCH,
	payload: axios.post('/addMatch', {
		category,
		date: newDate,
		home,
		away
	})
});

export const getMatchList = (numberOfMatches, option) => ({
	type: GET_MATCH_LIST,
	payload: axios.post('/getMatchList', {
		numberOfMatches,
		option
	})
});

export const deleteMatch = (id) => ({
	type: DELETE_MATCH,
	payload: axios.post('/deleteMatch', {
		id
	})
});

export const updateMatch = (id, update) => ({
	type: UPDATE_MATCH,
	payload: axios.post('/updateMatch', {
		id,
		update
	})
});

export const betting = (id, userEmail, option, money) => ({
	type: BETTING,
	payload: axios.post('/betting', {
		id,
		userEmail,
		option,
		money
	})
});

const initialState = {
	matchList: [],
	matchOption: '0',
	numberOfMatches: 10
};

export default handleActions(
	{
		[GET_MORE_MATCH_LIST]: (state, action) => {
			const newNumberOfMatches = state.numberOfMatches + 10;
			return {
				...state,
				numberOfMatches: newNumberOfMatches
			};
		},
		[RESET_NUMBER_OF_MATCHES]: (state, action) => {
			const newNumberOfMatches = 10;
			return {
				...state,
				numberOfMatches: newNumberOfMatches
			};
		},
		[SET_MATCH_OPTION]: (state, action) => {
			const newMatchOption = action.payload;
			return {
				...state,
				matchOption: newMatchOption
			};
		},
		...pender({
			type: GET_MATCH_LIST,
			onSuccess: (state, action) => ({
				...state,
				matchList: action.payload.data
			})
		}),
		...pender({
			type: DELETE_MATCH,
			onSuccess: (state, action) => ({
				...state
			})
		}),

		...pender({
			type: UPDATE_MATCH,
			onSuccess: (state, action) => ({
				...state
			})
		}),
		...pender({
			type: BETTING,
			onSuccess: (state, action) => {
				console.log(action);
				return { ...state };
			}
		})
	},
	initialState
);
