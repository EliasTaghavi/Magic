import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  userData: null,
  shopData: null,
}

export const STORE_NAME = 'user';

const user = createSlice({
  name: STORE_NAME,
  initialState,
  reducers: {
    setUserData: (state, {payload}) => {
      state.userData = payload;
    },
    setShopData: (state, {payload}) => {
      state.shopData = payload;
    },
  },
});

export const {actions, reducer} = user;
