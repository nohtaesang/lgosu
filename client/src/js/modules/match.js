import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import axios from 'axios';

// Tab 컴포넌트에서 match option을 설정한다. (0: 경기전, 1: 경기중, 2: 경기후)
const SET_MATCH_OPTION = 'SET_MATCH_OPTION';
export const setMatchOption = option => ({
	type: SET_MATCH_OPTION,
	payload: option
});

// DB에서 option에 맞는 매치목록을 불러온다.
const GET_MATCH_LIST = 'GET_MATCH_LIST';
export const getMatchList = (numberOfMatches, option) => ({
	type: GET_MATCH_LIST,
	payload: axios.post('/match/getMatchList', {
		numberOfMatches,
		option
	})
});

// match의 bettingUsers에 정보를 추가한다.
const BET = 'BET';
export const bet = (id, userEmail, option, betMoney) => ({
	type: BET,
	payload: axios.post('/match/bet', {
		id,
		userEmail,
		option,
		betMoney
	})
});

// match에 bettingUsers에 해당 userEmail이 있다면 지운다.
const CANCEL_BET = 'CANCEL_BET';
export const cancelBet = (id, userEmail) => ({
	type: CANCEL_BET,
	payload: axios.post('/match/cancelBet', {
		id,
		userEmail
	})
});

// Add
const ADD_MATCH = 'ADD_MATCH';
export const addMatch = (category, newDate, home, away, bettingOptions, dividendMoney) => ({
	type: ADD_MATCH,
	payload: axios.post('/addMatch', {
		category,
		date: newDate,
		home,
		away,
		bettingOptions,
		dividendMoney
	})
});

// Update
const UPDATE_MATCH = 'UPDATE_MATCH';
export const updateMatch = (id, update) => ({
	type: UPDATE_MATCH,
	payload: axios.post('/match/updateMatch', {
		id,
		update
	})
});

// Delete
const DELETE_MATCH = 'DELETE_MATCH';
export const deleteMatch = id => ({
	type: DELETE_MATCH,
	payload: axios.post('/match/deleteMatch', {
		id
	})
});

// match를 더 불러온다
const GET_MORE_MATCHES = 'GET_MORE_MATCHES';
export const getMoreMatchList = () => ({
	type: GET_MORE_MATCHES
});

// TODO: or delete
const RESET_NUMBER_OF_MATCHES = 'RESET_NUMBER_OF_MATCHES';
export const resetNumberOfMatches = () => ({
	type: RESET_NUMBER_OF_MATCHES
});

const initialState = {
	matchOption: 0,
	matchList: [],
	numberOfMatches: 10
};

export default handleActions(
	{
		[SET_MATCH_OPTION]: (state, action) => ({
			...state,
			matchOption: action.payload,
			numberOfMatches: 10
		}),
		[GET_MORE_MATCHES]: (state, action) => ({
			...state,
			numberOfMatches: state.numberOfMatches + 10
		}),
		[RESET_NUMBER_OF_MATCHES]: (state, action) => {
			const newNumberOfMatches = 10;
			return {
				...state,
				numberOfMatches: newNumberOfMatches
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
			type: BET,
			onSuccess: (state, action) => ({ ...state })
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
			type: CANCEL_BET,
			onSuccess: (state, action) => ({ ...state })
		})
	},
	initialState
);
