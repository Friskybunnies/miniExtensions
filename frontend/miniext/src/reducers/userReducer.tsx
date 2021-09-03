import { LOGIN, LOGOUT, ERROR, REQUEST } from '../constants/constants';

export interface UserState {
    loading?: boolean
    studentName: string
    error?: string
    zippedData?: any
};
interface Action {
    type: string,
    payload?: any
};

export const userLoginReducer = (state: UserState = { studentName: '' }, action: Action) => {
    switch (action.type) {
        case REQUEST:
            return {
                ...state,
                loading: action.payload.loading,
                studentName: action.payload.name
            }
        case LOGIN:
            return {
                ...state,
                studentName: action.payload.name,
                zippedData: action.payload.zippedData,
                loading: action.payload.loading
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

