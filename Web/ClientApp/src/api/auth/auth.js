import axios from "axios";

export const sendMobile = (mobileNumber) => {
  let headers = {
    'Content-Type': 'application/json',
  };
  return axios.post('/api/Session/CreateByPhone', JSON.stringify({phone: mobileNumber}), {headers}).then((res) => {
    console.log(res);
    return res.data;
  })
    .catch((e) => {
      console.log(e, e.response);
    })
}
