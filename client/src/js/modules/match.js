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

export const addMatch = (date, time, home, away, maxSet) => ({
	type: ADD_MATCH,
	payload: axios.post('/addMatch', {
		date,
		time,
		home,
		away,
		maxSet
	})
});

export const getMatchList = (numberOfMatches, option) => ({
	type: GET_MATCH_LIST,
	payload: axios.post('/getMatchList', {
		numberOfMatches,
		option
	})
});

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

export const betting = (id, insert) => ({
	type: BETTING,
	payload: axios.post('/insertMatch', {
		id,
		insert
	})
});

const initialState = {
	matchList: [],
	matchOption: 'all',
	numberOfMatches: 10,
	players: {
		kt: ['smeb', 'kingen', 'score', 'bdd', 'snowflower'],
		griffin: ['sword', 'tarzan', 'chovy', 'rather', 'viper', 'rehanz'],
		kingzone: ['rascal', 'cuzz', 'pawn', 'deft', 'tusin'],
		geng: ['cuvee', 'roach', 'peanut', 'fly', 'ruler', 'life'],
		afreeca: [
			'kiin',
			'sumit',
			'spirit',
			'twinkle',
			'ucal',
			'ruby',
			'aming',
			'proud',
			'gelly'
		],
		hanhwa: [
			'sohwan',
			'thal',
			'moojin',
			'bono',
			'tempt',
			'larva',
			'sangyoon',
			'cleaver',
			'key',
			'esper'
		],
		skt: [
			'khan',
			'crazy',
			'clid',
			'haru',
			'faker',
			'teddy',
			'leo',
			'mata',
			'effort'
		],
		jinair: [
			'lindarang',
			'tana',
			'malrang',
			'grace',
			'chengo',
			'stitch',
			'root',
			'nova',
			'kelyn'
		],
		damwon: [
			'nuguri',
			'punch',
			'canion',
			'showmaker',
			'newclear',
			'calm',
			'hoit',
			'beril'
		],
		battlecomics: [
			'wiser',
			'onflick',
			'crush',
			'dove',
			'hollow',
			'joker',
			'doraon'
		]
	}
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
			onSuccess: (state, action) => ({
				...state
			})
		})
	},
	initialState
);
