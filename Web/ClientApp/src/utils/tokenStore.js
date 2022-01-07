const setUserToken = (token) => {
  return localStorage.setItem('token', token);
}

const getUserToken = () => {
  return localStorage.getItem('token');
}

const setShopToken = (token) => {
  return localStorage.setItem('token', token);
}

const getShopToken = () => {
  return localStorage.getItem('token');
}

const setAdminToken = (token) => {
  return localStorage.setItem('adminToken', token);
}

const getAdminToken = () => {
  return localStorage.getItem('adminToken');
}

const removeUserToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userType');
};

const removeAdminToken = () => {
  localStorage.removeItem('adminToken');
};

export default {
  setUserToken,
  getUserToken,
  setShopToken,
  getShopToken,
  setAdminToken,
  getAdminToken,
  removeUserToken,
  removeAdminToken,
}
