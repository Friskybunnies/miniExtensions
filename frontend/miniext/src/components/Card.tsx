import React from 'react';
import './Card.css';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { UserState } from '../reducers/userReducer';

export default function Card() {
    const userLogin = useSelector<RootState, UserState>(state => state.name);
    const { zippedData, loading } = userLogin;

    return (
        <div>
            { (loading === true) ? (
                <div>Loading...</div>
            ) : (
                    <div>
                        {zippedData.map((group: any) => {
                            return (
                                <div key={group} className="cardContainer">
                                    <div className="card">
                                        <div id="nameTitle">Name</div>
                                        <div className="cardClass" key={group[0]}>{group[0]}</div>
                                        <div id="studentsTitle">Students</div>
                                        <div className="cardStudents" key={group.slice(1,)}>{group.slice(1,)}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
            }
        </div>
    )
}




