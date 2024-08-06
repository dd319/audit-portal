// import { configureStore } from '@reduxjs/toolkit';

// import formReducer from './formSlice';


// const store = configureStore({
//   reducer: {
// form: formReducer
//   },
// });

// export default store;
import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../features/form/formSlice';
import rootReducer from './reducers';

const store = configureStore({
  reducer: {
    form: formReducer,
    root: rootReducer,
  },
  // No need to manually add thunk middleware as it's included by default
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;