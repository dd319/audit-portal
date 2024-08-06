import { FETCH_CASES_SUCCESS, FETCH_CASES_ERROR } from './actions';

const initialState = {
    cases: [],
    error: null,
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CASES_SUCCESS:
            return {
                ...state,
                cases: action.payload,
                loading: false,
                error: null
            };
        case FETCH_CASES_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        default:
            return state;
    }
};

export default reducer;