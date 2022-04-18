import * as userApi from '../../usersArea/api/user/profile';
import * as UserStore from './index';

export const getUserData = () => async (dispatch) => {
	let result = await userApi.getUserDetails();
	dispatch(UserStore.actions.updateUserData(result));
};
