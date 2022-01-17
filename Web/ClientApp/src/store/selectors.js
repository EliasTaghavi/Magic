import {shallowEqual, useSelector} from "react-redux";

export const useShallowPickerSelector = (store, properties) => useSelector((state) => state[store][properties], shallowEqual);
