import {
    NAV_MOVE_PAGE,
    LOGIN_EMAIL_CHANGE,
    LOGIN_PASSWORD_CHANGE,
} from '../constants/action-types';

export const navMovePage = state => ({ type: NAV_MOVE_PAGE, payload: state });
export const loginEmailChange = state => ({ type: LOGIN_EMAIL_CHANGE, payload: state });
export const loginPasswordChange = state => ({ type: LOGIN_PASSWORD_CHANGE, payload: state });
