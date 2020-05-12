import { config } from '../config';

export const setMessage = (message) => ({
  type: 'SET_MESSAGE',
  payload: message
});
export const checkUserData = userData => (dispatch) => {
  if (userData) {
    dispatch({ type: 'UPDATE_USERDATA_SUCCESS', payload: userData });
  } else {
    dispatch({ type: 'UPDATE_USERDATA_FAILURE', payload: null });
  }
};
export const registerUserAction = (params) => (dispatch) => {
  let data = localStorage.getItem('data');
  if (!data) {
    data = {
      userData: []
    };
    data = JSON.stringify(data);
  }
  data = JSON.parse(data);
  let userData = data.userData;
  let index = userData.findIndex(o => {
    return o.email === params.email
  });
  if (index === -1) {
    data.userData.push(params); //add some data
    data = JSON.stringify(data);
    localStorage.setItem('data', data);
    dispatch({
      type: 'REGISTER_USER_SUCCESS',
      payload: params
    });
  } else {
    dispatch({
      type: 'REGISTER_USER_FAILED',
      payload: 'User Already Exists. Please login'
    });
  }
};
export const submitLoginAction = (params) => dispatch => {
  let data = localStorage.getItem('data');
  if (!data) {
    dispatch({
      type: 'LOGIN_USER_FAILED',
      payload: "Invalid Credentials or User Doesn't Exists"
    });
  }
  data = JSON.parse(data);
  let userData = data.userData;
  let userObj = userData.find(o => {
    return (o.email === params.email && o.password === params.password)
  });
  if (userObj) {
     delete userObj.password;
     let sessionData = {
       data: userObj,
       sessionTTL: config.sessionTTLInMinutes * 60 * 1000
     };
     sessionStorage.setItem('userData', JSON.stringify(sessionData));
     sessionStorage.setItem('loggedInTimeStamp', Date.now().toString());
     dispatch({
       type: 'LOGIN_USER_SUCCESS',
       payload: sessionData
     });
  } else {
    dispatch({
      type: 'LOGIN_USER_FAILED',
      payload: "Invalid Credentials or User Doesn't Exists"
    });
  }
}

export const fetchLoginDetail = (params) => dispatch => {
  let userdata = sessionStorage.getItem('userData');
  let loggedInTimeStamp = sessionStorage.getItem('loggedInTimeStamp');
  if (userdata && loggedInTimeStamp) {
    loggedInTimeStamp = parseInt(loggedInTimeStamp);
    userdata = JSON.parse(userdata);
    let userTokenExp = userdata.sessionTTL;
    let expireTime = loggedInTimeStamp + userTokenExp * 1000;
    if (expireTime > Date.now()) {
      dispatch({
        type: 'UPDATE_USERDATA_SUCCESS',
        payload: userdata
      })
    } else {
      sessionStorage.removeItem('userData');
      sessionStorage.removeItem('loggedInTimeStamp');
      dispatch({
        type: 'UPDATE_USERDATA_FAILURE',
        payload: 'SESSION EXPIRED'
      })
    }
  } else {
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('loggedInTimeStamp');
    dispatch({
      type: 'UPDATE_USERDATA_FAILURE',
      payload: null
    })
  }
}
