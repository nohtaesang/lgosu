import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import axios from 'axios';

const GET_MATCH_LIST = 'GET_MATCH_LIST';
const GET_MORE_MATCH_LIST = 'GET_MORE_MATCH_LIST';
const DELETE_MATCH = 'DELETE_MATCH';
const UPDATE_MATCH = 'UPDATE_MATCH';

export const getMatchList = numberOfMatches => ({
    type: GET_MATCH_LIST,
    payload: axios.post('/api/admin/loadMatchList', {
        numberOfMatches,
    }),
});
export const getMoreMatchList = () => ({
    type: GET_MORE_MATCH_LIST,
});

export const deleteMatch = id => ({
    type: DELETE_MATCH,
    payload: axios.post('/api/admin/deleteMatch', {
        id,
    }),
});

export const updateMatch = (id, update) => ({
    type: UPDATE_MATCH,
    payload: axios.post('/api/admin/updateMatch', {
        id,
        update,
    }),
});

const initialState = {
    matchList: [],
    numberOfMatches: 10,
};

export default handleActions(
    {
        [GET_MORE_MATCH_LIST]: (state, action) => {
            const newNumberOfMatches = state.numberOfMatches + 10;
            return { ...state, numberOfMatches: newNumberOfMatches };
        },
        ...pender({
            type: GET_MATCH_LIST,
            onSuccess: (state, action) => ({ ...state, matchList: action.payload.data }),
        }),
        ...pender({
            type: DELETE_MATCH,
            onSuccess: (state, action) => ({}),
        }),
        ...pender({
            type: UPDATE_MATCH,
            onSuccess: (state, action) => ({ ...state }),
        }),
    },
    initialState,
);
