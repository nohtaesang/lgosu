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

const BET = 'BET';
const CANCEL_BET = 'CANCEL_BET';
export const setMatchOption = option => ({
	type: SET_MATCH_OPTION,
	payload: option
});

export const resetNumberOfMatches = () => ({
	type: RESET_NUMBER_OF_MATCHES
});

export const getMoreMatchList = () => ({
	type: GET_MORE_MATCH_LIST
});

export const addMatch = (category, newDate, home, away, bettingOptions) => ({
	type: ADD_MATCH,
	payload: axios.post('/addMatch', {
		category,
		date: newDate,
		home,
		away,
		bettingOptions
	})
});

export const getMatchList = (numberOfMatches, option) => ({
	type: GET_MATCH_LIST,
	payload: axios.post('/getMatchList', {
		numberOfMatches,
		option
	})
});

export const deleteMatch = id => ({
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

export const bet = (id, userEmail, option, money) => ({
	type: BET,
	payload: axios.post('/bet', {
		id,
		userEmail,
		option,
		money
	})
});

export const cancelBet = (id, userEmail) => ({
	type: CANCEL_BET,
	payload: axios.post('/cancelBet', {
		id,
		userEmail
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
			type: BET,
			onSuccess: (state, action) => {
				console.log(action);
				return { ...state };
			}
		}),
		...pender({
			type: CANCEL_BET,
			onSuccess: (state, action) => {
				console.log(action);
				return { ...state };
			}
		})
	},
	initialState
);
