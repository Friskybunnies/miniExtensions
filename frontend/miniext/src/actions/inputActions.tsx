import { ERROR, UPDATE_INPUT } from '../constants/constants';

export const updateInput = (input: any) => (dispatch: any) => {
    try {
        dispatch({
            type: UPDATE_INPUT,
            payload: input
        })
    } catch (err: any) {
        dispatch({
            type: ERROR,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}