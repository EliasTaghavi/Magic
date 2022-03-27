import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  userData: null,
  shopData: null,
  adminData: null,
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
    setAdminData: (state, {payload}) => {
      state.adminData = payload;
    },
  },
});

export const {actions, reducer} = user;
