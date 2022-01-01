import React from 'react';
import '../../../admin.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
	faBars,
	faHome,
	faList,
	faSignOutAlt,
	faUser,
	faUsers
} from "@fortawesome/free-solid-svg-icons";
import {Link, useHistory} from "react-router-dom";
import logo from "../../../../assets/images/logo.png";
import Divider from "../../../../components/divider";
import TokenStore from "../../../../utils/tokenStore";

const AdminHeader = ({open, setOpen, children}) => {

	return (
		<div className="w-100">
			<div className="d-none d-md-flex">
				<MdDrawer open={open} setOpen={setOpen} />
				<div className="flex">
					<div className="shadow1 sticky-top adminHeaderNav" style={{height: 63}}>
						<div className="d-flex align-items-center justify-content-start h-100">
							<button type="button"
									  className="bg-transparent outline d-flex align-items-center justify-content-center border-0 mr-4 text-secondary"
									  style={{cursor: 'pointer'}} onClick={() => setOpen(!open)}>
								<FontAwesomeIcon icon={faBars} style={{fontSize: 22}}/>
							</button>
							<div className="d-flex align-items-center">
								<Link to="/admin/panel" className="text-secondary fontSize4 pr-4 text-decoration-none fs18">مجیک آف</Link>
							</div>
						</div>
						<div className="logoContainer">
							<img alt="magicOff" src={logo} className="logo" />
						</div>
					</div>
					<div className="bg-light panelGlobalContainer">
						{children}
					</div>
				</div>
			</div>
			<div className="position-relative d-flex d-md-none" onClick={(e) => {if (e.target.id === 'drawerFather') setOpen(false)}}>
				<div id="drawerFather" className="DrawerFather p-0 border-0 z1022"
					  style={{display: open ? 'flex' : 'none'}}/>

				<div className="d-flex flex-column w-100 align-items-start justify-content-start">
					<div className="adminHeaderNav shadow1 sticky-top" style={{height: 63}}>
						<div className="d-flex align-items-center justify-content-start h-100">
							<button type="button"
									  className="bg-transparent outline d-flex align-items-center justify-content-center border-0 mr-4 text-secondary"
									  style={{cursor: 'pointer'}} onClick={() => setOpen(!open)}>
								<FontAwesomeIcon icon={faBars} style={{fontSize: 22}}/>
							</button>
							<div className="d-flex align-items-center">
								<Link to="/admin/panel" className="text-secondary fontSize4 pr-4 text-decoration-none fs18">مجیک آف</Link>
							</div>
						</div>
						<div className="logoContainer">
							<img alt="magicOff" src={logo} className="logo" />
						</div>
					</div>
					<div className="bg-light panelGlobalContainer">
						{children}
					</div>
				</div>
				<div id="drawer" className="d-flex panelDrawer sticky-top" style={open ? {right: 0} : {right: '-100%'}}>
					<Drawer open={open} setOpen={setOpen} extraClassName="d-flex" />
				</div>
			</div>
		</div>
	);
};

const MdDrawer = ({extraClassName, open, setOpen}) => {
	return (
		<div className={`adminPanelDrawer py-3 transition sticky-top ${open ? 'w280' : 'w60'} ${extraClassName}`}>
			<div className="d-flex centered px-2">
				<div className="d-flex align-items-center justify-content-center userLogo bg-light">
					<FontAwesomeIcon icon={faUser} className="text-dark"/>
				</div>
				<span className={`text-white transition mr-3 noWrapText ${open ? '' : 'opacity0'}`}>مدیر گرامی</span>
			</div>
			<Divider />
			<MenuItems open={open} setOpen={setOpen} />
		</div>
	);
}

const Drawer = ({extraClassName, open, setOpen}) => {
	return (
		<div className={`adminPanelDrawer py-3 transition sticky-top w280 ${extraClassName}`}>
			<div className="d-flex centered px-2">
				<div className="d-flex align-items-center justify-content-center userLogo bg-light">
					<FontAwesomeIcon icon={faUser} className="text-dark"/>
				</div>
				<span className="text-white transition noWrapText mr-3">مدیر گرامی</span>
			</div>
			<Divider />
			<MenuItems open={open} setOpen={setOpen} noOpacity={true} />
		</div>
	);
}

const MenuItems = ({open, setOpen, noOpacity}) => {
	const history = useHistory();
	const logout = () => {
		TokenStore.remove();
		history.replace('/admin');
	}

	return (
		<ul className="list-unstyled p-0 w-100">
			<li className="menuItem rounded" onClick={() => setOpen(false)}>
				<Link to="/admin/panel" className="menuLink cpx-12">
					<FontAwesomeIcon icon={faHome} className="fs18"/>
					<span className={`nav-link my-1 transition ${!noOpacity && !open ? 'opacity0' : ''}`}>داشبورد</span>
				</Link>
			</li>
			<li className="menuItem rounded" onClick={() => setOpen(false)}>
				<Link to="/admin/panel/all-users" className="menuLink cpx-12">
					<FontAwesomeIcon icon={faUsers} className="fs18"/>
					<span className={`nav-link my-1 transition ${!noOpacity && !open ? 'opacity0' : ''}`}>لیست کاربران</span>
				</Link>
			</li>
			{/*<li className="menuItem rounded">*/}
			{/*	<button type="button" className="border-0 menuLink cpx-12 collapsed" data-toggle="collapse" data-target="#submenu">*/}
			{/*		<div className="w-100 d-flex align-items-center">*/}
			{/*			<FontAwesomeIcon icon={faUsers} className="fs18"/>*/}
			{/*			<span className={`nav-link my-1 transition ${!noOpacity && !open ? 'opacity0' : ''}`}>لیست کاربران</span>*/}
			{/*		</div>*/}
			{/*		<FontAwesomeIcon icon={faChevronDown} className={`chevron ${!noOpacity && !open ? 'opacity0' : ''}`}/>*/}
			{/*	</button>*/}
				{/*<div className="collapse w-100" id="submenu">*/}
				{/*	<ul className="nav p-0 d-flex flex-column list-unstyled">*/}
				{/*		<li className="nav-item subMenuItem"*/}
				{/*			 onClick={() => setOpen(false)}>*/}
				{/*			<Link to="/admin/panel/all-users" className="menuLink d-flex flex-row align-items-center justify-content-start">*/}
				{/*				<FontAwesomeIcon icon={faCircle} className="p-0 my-0 fs4" style={{margin: '0 20px'}} />*/}
				{/*				<span className="nav-link pr-3">همه کاربران</span>*/}
				{/*			</Link>*/}
				{/*		</li>*/}
				{/*		<li className="nav-item subMenuItem"*/}
				{/*			 onClick={() => setOpen(false)}>*/}
				{/*			<Link to="/admin/panel/verified-users" className="menuLink d-flex flex-row align-items-center justify-content-start">*/}
				{/*				<FontAwesomeIcon icon={faCircle} className="p-0 my-0 fs4" style={{margin: '0 20px'}} />*/}
				{/*				<span className="nav-link pr-3">تایید شده</span>*/}
				{/*			</Link>*/}
				{/*		</li>*/}
				{/*		<li className="nav-item subMenuItem"*/}
				{/*			 onClick={() => setOpen(false)}>*/}
				{/*			<Link to="/admin/panel/waiting-users" className="menuLink d-flex flex-row align-items-center justify-content-start">*/}
				{/*				<FontAwesomeIcon icon={faCircle} className="p-0 my-0 fs4" style={{margin: '0 20px'}} />*/}
				{/*				<span className="nav-link pr-3">در انتظار تایید</span>*/}
				{/*			</Link>*/}
				{/*		</li>*/}
				{/*	</ul>*/}
				{/*</div>*/}
			{/*</li>*/}
			<li className="menuItem rounded" onClick={() => setOpen(false)}>
				<Link to="/admin/panel/transactions" className="menuLink cpx-12">
					<FontAwesomeIcon icon={faList} className="fs18"/>
					<span className={`nav-link my-1 transition ${!noOpacity && !open ? 'opacity0' : ''}`}>تراکنش ها</span>
				</Link>
			</li>
			<Divider />
			<li className="menuItem rounded" onClick={() => setOpen(false)}>
				<button type="button" className="border-0 outline bg-transparent menuLink cpx-12" onClick={() => logout()}>
					<FontAwesomeIcon icon={faSignOutAlt} className="fs18"/>
					<span className={`nav-link my-1 transition ${!noOpacity && !open ? 'opacity0' : ''}`}>خروج</span>
				</button>
			</li>
		</ul>
	);
}

export default AdminHeader;
