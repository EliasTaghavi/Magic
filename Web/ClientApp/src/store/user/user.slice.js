import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    incrementByAmount: (state, {payload}) => {
      state.value += payload
    },
  },
});
