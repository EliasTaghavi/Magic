import {configureStore} from '@reduxjs/toolkit'
import UserStore from './user';
import thunk from "redux-thunk";
import {
  persistStore,
  persistReducer,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux";

const rootReducer = combineReducers({
  user: UserStore,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: [],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
export default store;
