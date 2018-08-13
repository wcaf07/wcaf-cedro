export const USER = {
    SIGNUP_SUCCESS: 'user/USER_SIGNUP_SUCCESS',
    SIGNUP_FAIL: 'user/USER_SIGNUP_FAIL',
    SIGNUP: 'user/USER_SIGNUP'
};

export const LOGIN = {
    LOGIN_SUCCESS: 'login/USER_LOGIN_SUCCESS',
    LOGIN_FAIL: 'login/USER_LOGIN_FAIL',
    LOGIN: 'login/USER_LOGIN'
}

export default function reducer(state =  {}, action: any) {
  console.log("reducer called", state);
    switch (action.type) {
      case USER.SIGNUP:
        return { ...state, loading: true };
      case USER.SIGNUP_SUCCESS:
        return { ...state, success: true, loading: false };
      case USER.SIGNUP_FAIL:
        return {
          ...state,
          success: false,
          loading: false,
          error: 'Error: User not created'
        };
      case LOGIN.LOGIN:
        return { ...state, loading: true };
      case LOGIN.LOGIN_SUCCESS:
        return { ...state, success: true, loading: false };
      case LOGIN.LOGIN_FAIL:
        return {
          ...state,
          success: false,
          loading: false,
          error: 'Invalid Credentials'
        };
      default:
        return state;
    }
  }

  export function signUpUser(user: any) {
    return {
      type: USER.SIGNUP,
      payload: {
        request: {
          url: '/register',
          method: 'POST',
          data: {name : user.name, password : user.password, email : user.email}
        }
      }
    };
  }

  export function loginUser(user: any) {
    return {
      type: LOGIN.LOGIN,
      payload: {
        request: {
          url: '/login',
          method: 'POST',
          data: {password : user.password, email : user.email}
        }
      }
    };
  }