import { LOGIN, LOGOUT, ERROR } from '../constants/userConstants';

export interface UserState {
    loading?: boolean
    studentName: string
    error?: string
};
interface Action {
    type: string,
    payload?: string
};

export const userLoginReducer = (state: UserState = { studentName: '' }, action: Action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                studentName: action.payload
            }
        case LOGOUT:
            return {
                ...state,
                studentName: ''
            }
        case ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

