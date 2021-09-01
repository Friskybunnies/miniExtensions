import React, { SyntheticEvent } from 'react';
import './Logout.css';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';

export default function Logout() {
    const dispatch = useDispatch();

    const logoutHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(logout());
    }

    return (
        <div className="logout">
            <button onClick={logoutHandler}>Log out</button>
        </div>
    )
}
