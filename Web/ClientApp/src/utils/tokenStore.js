const setUserToken = (token) => {
  return localStorage.setItem('userToken', token);
}

const getUserToken = () => {
  return localStorage.getItem('userToken');
}

const setShopToken = (token) => {
  return localStorage.setItem('shopToken', token);
}

const getShopToken = () => {
  return localStorage.getItem('shopToken');
}

const setAdminToken = (token) => {
  return localStorage.setItem('adminToken', token);
}

const getAdminToken = () => {
  return localStorage.getItem('adminToken');
}

const removeUserToken = () => {
  localStorage.removeItem('userToken');
};

const removeShopToken = () => {
  localStorage.removeItem('shopToken');
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
  removeShopToken,
}
