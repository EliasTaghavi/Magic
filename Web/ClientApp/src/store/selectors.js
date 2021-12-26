import {createSelector} from "@reduxjs/toolkit";

const selectSelf = (state) => state
export const useShallowPickerSelector = createSelector(
  selectSelf,
  (state) => state.value
)
