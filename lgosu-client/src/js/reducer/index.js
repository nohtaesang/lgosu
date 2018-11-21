import { NAV_MOVE_PAGE } from '../constants/action-types';

const initialState = {
    curPage: 'index',
};

const rootReducer = (state = initialState, action) => {
    console.log(state);
    switch (action.type) {
    case NAV_MOVE_PAGE:
        return { ...state, curPage: action.payload };
    default:
        return state;
    }
};

export default rootReducer;
