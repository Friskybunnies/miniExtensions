import { UPDATE_INPUT, ERROR } from '../constants/userConstants';

export interface InputState {
    input: string
};
interface Action {
    type: string,
    payload?: string
};

export const userInputReducer = (state: InputState = { input: '' }, action: Action) => {
    switch (action.type) {
        case UPDATE_INPUT:
            return {
                ...state,
                input: action.payload
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

