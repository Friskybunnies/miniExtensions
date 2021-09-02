import React, { SyntheticEvent } from 'react';
import './Data.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import { updateInput } from '../actions/inputActions';
import { RootState } from '../app/store';
import { UserState } from '../reducers/userReducer';
import { InputState } from '../reducers/inputReducer';
import Card from './Card';

export default function Data() {
    const dispatch = useDispatch();

    const userLogin = useSelector<RootState, UserState>(state => state.name);
    const { studentName } = userLogin;

    const { input } = useSelector<RootState, InputState>(state => state.input);

    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(login(input));
    }

    return (
        <div>
            { (studentName === '') ? (
                <form onSubmit={submitHandler}>
                    <div className="loginField">
                        <label className='labelText' htmlFor="name">Student Name: </label>
                        <input type="text" id="name" name="name" onChange={(e) => dispatch(updateInput(e.target.value))} />
                    </div>
                    <button type="submit">Log in</button>
                </form>
            ) : (
                    <Card></Card>
                )
            }
        </div>
    )
}
