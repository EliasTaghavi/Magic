const setToken = (token) => {
  return localStorage.setItem('token', token);
}

const getToken = () => {
  return localStorage.getItem('token');
}

const setAdminToken = (token) => {
  return localStorage.setItem('adminToken', token);
}

const getAdminToken = () => {
  return localStorage.getItem('adminToken');
}

const setUserType = (userType) => {
  return localStorage.setItem('userType', userType);
}

const getUserType = () => {
  return localStorage.getItem('userType');
}

const remove = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userType');
  localStorage.removeItem('adminToken');
};

export default {
  setToken,
  getToken,
  setAdminToken,
  getAdminToken,
  setUserType,
  getUserType,
  remove,
}
