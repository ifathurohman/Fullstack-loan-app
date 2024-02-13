import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';
import {
  getLoanReducer,
} from './reducers/loanReducer';
const reducer = {
  user: userReducer,
  getLoans: getLoanReducer,
};

const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      thunk: {
        extraArgument: reducer
      }
    })
})

export default store;
