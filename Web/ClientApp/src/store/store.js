import {configureStore} from '@reduxjs/toolkit'
import * as UserStore from './user';
import * as MainStore from './main';
import thunk from "redux-thunk";
import {
  persistStore,
  persistReducer,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux";

const rootReducer = combineReducers({
  [MainStore.STORE_NAME]: MainStore.reducer,
  [UserStore.STORE_NAME]: UserStore.reducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  reducer: rootReducer,
  whiteList: [
     'user',
  ],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
export default store;
