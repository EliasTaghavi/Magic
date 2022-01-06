import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  userData: null,
}

export const STORE_NAME = 'user';

const user = createSlice({
  name: STORE_NAME,
  initialState,
  reducers: {
    setUserData: (state, {payload}) => {
      state.userData = payload;
    },
  },
});

export const {actions, reducer} = user;
