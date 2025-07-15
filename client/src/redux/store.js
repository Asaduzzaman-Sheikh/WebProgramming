import userReducer from './user/userSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { version } from 'mongoose';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: 'root',
  storage: storage,
  version: 1,
};
 // defaults to localStorage for web
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // Add your reducers here
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false, // Disable serializable check for non-serializable data
    }),
});

export const persistor = persistStore(store);