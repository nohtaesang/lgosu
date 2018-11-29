import { JOIN_ERROR, JOIN_USER_PROPS_CHECK } from '../constants/action-types';

export const joinError = state => ({ type: JOIN_ERROR, payload: state });
export const joinUserPropsCheck = state => ({ type: JOIN_USER_PROPS_CHECK, payload: state });
