import React from 'react';
import AdminHeader from "./components/adminHeader";

const AdminPanel = ({children}) => {
	return (
		<AdminHeader>
			{children}
		</AdminHeader>
	);
}

export default AdminPanel;
