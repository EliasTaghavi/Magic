import {createSlice} from '@reduxjs/toolkit'

const initialState = {
	logoutModal: false,
}

export const STORE_NAME = 'main';

const main = createSlice({
	name: STORE_NAME,
	initialState,
	reducers: {
		setLogoutModal(state, {payload}) {
			state.logoutModal = payload
		},
	},
});

export const {actions, reducer} = main;
