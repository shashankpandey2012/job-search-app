const initialState = {
  message: null,
  isLogin: false,
  userData: {},
  loginError: '',
  isRegistered: false,
  loginCheck: false,
  registrationError: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return {
        ...state,
        message: action.payload,
      };

    case 'LOGIN_USER_SUCCESS':
      return {
        ...state,
        isLogin: true,
        userData: action.payload,
        loginError: ''
      }

    case 'LOGIN_USER_FAILED':
      return {
        ...state,
        isLogin: false,
        userData: {},
        loginError: action.payload
      }

    case 'UPDATE_USERDATA_SUCCESS':
      return {
        ...state,
        userData: action.payload,
        isLogin: true,
        loginCheck: true,
      };

    case 'UPDATE_USERDATA_FAILURE':
      return {
        ...state,
        userData: {},
        isLogin: false,
        loginError: action.payload,
        loginCheck: true,
      };

    case 'REGISTER_USER_FAILED':
      return {
        ...state,
        isRegistered: false,
        registrationError: action.payload
      }

    case 'REGISTER_USER_SUCCESS':
      return {
        ...state,
        isRegistered: true,
        registrationError: ''
      }

    default:
      return state;
  }
};
