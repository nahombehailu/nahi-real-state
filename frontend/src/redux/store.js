import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { version } from 'mongoose';

// const store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// export default store;
const rootReducer=combineReducers({ user: userReducer})
const persistConfig={
  key:'root',
  storage,
  version:1

}
const persistedReducer=persistReducer(persistConfig,rootReducer)

export const store = configureStore({
  reducer: {
    persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),

});

export const persistor=persistStore(store)