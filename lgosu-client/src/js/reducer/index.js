import {
    NAV_MOVE_PAGE,
    JOIN_ERROR,
    JOIN_USER_PROPS_CHECK,
    LOGIN_EMAIL_CHANGE,
    LOGIN_PASSWORD_CHANGE,
} from '../constants/action-types';

const initialState = {
    curPage: 'index',
    joinErrorMessage: '',
    login: {
        isLoading: true,
        token: '',
        loginError: '',
        loginEmail: '',
        loginPassword: '',
        loginNickname: '',
    },
    join: {
        isLoading: true,
        joinError: '',
        joinEmail: '',
        joinPassword1: '',
        joinPassword2: '',
        joinNickname: '',
    },
};

const loginReducer = (state = initialState.login, action) => {
    switch (action.type) {
    case LOGIN_EMAIL_CHANGE:
        return { ...state, loginEmail: action.payload };
    case LOGIN_PASSWORD_CHANGE:
        return { ...state, loginPassword: action.payload };
    default:
        return state;
    }
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
    case LOGIN_EMAIL_CHANGE:
    case LOGIN_PASSWORD_CHANGE:
        return { ...state, login: loginReducer(state.login, action) };
    case NAV_MOVE_PAGE:
        return { ...state, curPage: action.payload };
    case JOIN_ERROR:
        return { ...state, joinErrorMessage: action.payload };
    default:
        return state;
    }
};

export default rootReducer;
