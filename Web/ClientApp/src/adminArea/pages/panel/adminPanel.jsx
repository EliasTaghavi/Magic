import React, {useState} from 'react';
import './adminPanel.css';
import AdminHeader from "./components/adminHeader";

const AdminPanel = ({children}) => {
	const [open, setOpen] = useState(false);

	return (
		<div className="d-flex w-100">
			<AdminHeader open={open} setOpen={(value) => setOpen(value)}>
				{children}
			</AdminHeader>
		</div>
	);
}

export default AdminPanel;
