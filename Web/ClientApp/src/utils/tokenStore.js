const setToken = (token) => {
  return localStorage.setItem('token', token);
}

const getToken = () => {
  return localStorage.getItem('token');
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
};

export default {
  setToken,
  getToken,
  setUserType,
  getUserType,
  remove,
}
