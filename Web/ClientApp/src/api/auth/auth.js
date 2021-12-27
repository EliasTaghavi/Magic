import axios from "axios";

export const sendUserLoginSms = (mobileNumber) => {
  let headers = {
    'Content-Type': 'application/json',
  };
  return axios.post('/api/Session/CreateByPhone', JSON.stringify({phone: mobileNumber}), {headers}).then((res) => {
    return res.data;
  })
     .catch((error) => {
       if (error.response.status === 401) {
         return 401;
       } else {
         return false;
       }
     })
}

export const sendUserLoginCode = ({mobile, code}) => {
  let headers = {
    'Content-Type': 'application/json',
  };
  let rawData = {
    phone: mobile,
    token: code,
  };
  let data = JSON.stringify(rawData);
  return axios.post('/api/Session/VerifyTokenByPhone', data, {headers}).then((res) => {
    return res.data;
  });
}

export const signupUser = (data) => {
  let {firstName, lastName, birthday, image, selfiImage, address, token} = data;
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token,
  };

  let textData = JSON.stringify({
    firstName,
    lastName,
    birthday,
    address,
  });

  let formData = new FormData();
  if (image) {
    formData.append('image', image);
  }
  if (selfiImage) {
    formData.append('selfiImage', selfiImage);
  }

  return axios.post('/api/Session/VerifyTokenByPhone', textData, {headers}).then((res) => {
    console.log(res);
    if (res.data) {
      return axios.post('/api/Session/VerifyTokenByPhone', formData, {headers}).then((res) => {
        return res.data;
      })
    } else {
      return
    }
  });
}
