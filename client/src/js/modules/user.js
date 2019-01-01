import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import axios from 'axios';

const initialState = {
	email: 'nohtaesang@naver.com',
	money: 20000
};

export default handleActions({}, initialState);
