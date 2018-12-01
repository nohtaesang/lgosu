import { ADMIN_LOAD_MATCH_LIST } from '../constants/action-types';

const initialState = {
    admin: {
        matchList: [],
    },
};

const adminReducer = (state = initialState.admin, action) => {
    switch (action.type) {
    case ADMIN_LOAD_MATCH_LIST:
        return { ...state, matchList: action.payload };
    default:
        return state;
    }
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
    case ADMIN_LOAD_MATCH_LIST:
        return adminReducer(state.admin, action);
    default:
        return state;
    }
};

export default rootReducer;
