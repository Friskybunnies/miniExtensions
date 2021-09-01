import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer } from '../reducers/userReducer';
import { userInputReducer } from '../reducers/inputReducer';

const reducers = combineReducers({
    name: userLoginReducer,
    input: userInputReducer
})

const middleware = [thunk]

const initialState = {}

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;

export type RootState = ReturnType<typeof store.getState>;