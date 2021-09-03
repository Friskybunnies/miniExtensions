import { ERROR, LOGIN, LOGOUT, REQUEST } from '../constants/userConstants';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import axios from 'axios';
import { RootState } from '../app/store';
require('dotenv').config();

export const login = (name: string): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
    async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {
        try {
            const loadState = { name: name, loading: true };
            let resultData: any;

            dispatch({
                type: REQUEST,
                payload: loadState
            })

            resultData = await axios(`http://localhost:5000/api/${name}`);
            console.log(resultData.data);

            setTimeout(function () {
                dispatch({
                    type: LOGIN,
                    payload: resultData.data
                });
            }, 10000)

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