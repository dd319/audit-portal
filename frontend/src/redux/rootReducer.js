// src/redux/rootReducer.js
// src/redux/rootReducer.js
// src/redux/rootReducer.js
import { combineReducers } from 'redux';
import casesReducer from './casesReducer';
import formReducer from '../features/form/formSlice';

const rootReducer = combineReducers({
    cases: casesReducer,
    form: formReducer,
});

export default rootReducer;
