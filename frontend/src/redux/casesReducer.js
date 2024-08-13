// src/redux/casesReducer.js
import { FETCH_CASES_SUCCESS, FETCH_CASES_FAILURE } from './actionTypes';

const initialState = {
    cases: [],
    error: null,
};

const casesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CASES_SUCCESS:
            return {
                ...state,
                cases: action.payload,
                error: null,
            };
        case FETCH_CASES_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default casesReducer;
