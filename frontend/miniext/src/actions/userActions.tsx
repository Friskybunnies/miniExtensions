import { ERROR, LOGIN, LOGOUT } from '../constants/userConstants';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from '../app/store';

export const login = (name: string): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
    async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {
        try {
            dispatch({
                type: LOGIN,
                payload: name
            })

            //const response = await fetch('http://localhost:5000)...


        } catch (err: any) {
            dispatch({
                type: ERROR,
                payload: err.response && err.response.data.message ? err.response.data.message : err.message
            })
        }
    }

export const logout = (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
    async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {
        try {
            dispatch({
                type: LOGOUT,
                payload: null
            })
        } catch (err: any) {
            dispatch({
                type: ERROR,
                payload: err.response && err.response.data.message ? err.response.data.message : err.message
            })
        }
    }