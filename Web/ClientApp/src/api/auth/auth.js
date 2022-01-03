import axios from "axios";

export const sendUserLoginSms = (mobileNumber) => {
  let headers = {
    'Content-Type': 'application/json',
  };
  return axios.post('/api/Session/CreateByPhone', JSON.stringify({phone: mobileNumber}), {headers}).then((res) => {
    if (res?.data?.code === '401') {
      return 401;
    } else {
      return res.data;
    }
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
    if (res?.data?.code === '401') {
      return 401;
    } else {
      return res.data;
    }
  })
     .catch((error) => {
       if (error.response.status === 401) {
         return 401;
       } else {
         return false;
       }
     })
}

export const signupUser = (data) => {
  let {firstName, lastName, birthday, image, selfiImage, address, token} = data;
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token,
  };
  let formData = new FormData();

  let textData = {
    FirstName: firstName,
    LastName: lastName,
    Birthday: `${birthday?.year}/${birthday?.month}/${birthday?.day}`,
    Address: address,
  };

  for (let [key, value] of Object.entries(textData)) {
    formData.append(key, value);
  }

  if (image) {
    formData.append('Identity', image);
  }
  if (selfiImage) {
    formData.append('Selfie', selfiImage);
  }

  console.log(Object.entries(formData))

  return axios.post('/api/user/fillData', formData, {headers}).then((res) => {
    if (res?.data?.code === '401') {
      return 401;
    } else {
      return res.data;
    }
  })
     .catch((error) => {
       if (error.response.status === 401) {
         return 401;
       } else {
         return false;
       }
     })
}
