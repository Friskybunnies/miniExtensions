import React from 'react';
import './App.css';
import Data from './components/Data';
import Logout from './components/Logout';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import { UserState } from './reducers/userReducer';

function App() {
  const userLogin = useSelector<RootState, UserState>(state => state.name);

  const { studentName } = userLogin;

  return (
    <div className="App">
      <div className="container">
        <main>
          {studentName !== '' ? (
            <div>
              <Logout></Logout>
              <Data></Data>
            </div>
          ) : (
              <Data></Data>
            )
          }
        </main>
      </div>
    </div>
  );
}

export default App;
