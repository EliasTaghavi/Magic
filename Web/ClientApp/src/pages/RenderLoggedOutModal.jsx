import React from 'react';
import {Modal} from "react-bootstrap";
import {useDispatch} from "react-redux";
import TokenStore from '../utils/tokenStore';
import * as MainStore from "../store/main";
import * as UserStore from "../store/user";
import {useHistory} from "react-router-dom";

const RenderLoggedOutModal = (data) => {
	const history = useHistory();
	let {type} = data?.data;
	const dispatch = useDispatch();

	return (
		<Modal
			show={true}
			size="md"
			centered={true}
			onHide={() => {}}
		>
			<div className="modal-content">
				<div className="modal-body d-flex flex-column align-items-center justify-content-center">
					<span className="mt-3">شما از سیستم خارج شدید.</span>
					<span className="mt-2">لطفا مجددا وارد شوید.</span>
					<button type="button" className="btn btn-outline-secondary mt-4" onClick={() => {
						if (type === 'user') {
							TokenStore.removeUserToken();
							dispatch(MainStore.actions.setLogoutModal({type: '', modal: false}));
							dispatch(UserStore.actions.setUserData(null));
							history.replace('/');
						} else if (type === 'admin') {
							TokenStore.removeAdminToken();
						}
					}}>
						تایید
					</button>
				</div>
			</div>
		</Modal>
	)
};

export default RenderLoggedOutModal;
