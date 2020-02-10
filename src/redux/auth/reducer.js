import authActions from "./actions";

const initState = {
  isLogin: false,
  token: null,
  isError: "",
  message: "",
  loader: false,
  posts: [],
};

export default function rootReducer(state = initState, action) {
  switch (action.type) {
    case authActions.LOGIN_REQUEST:
      return {
        ...state,
        loader: true
      };
    case authActions.LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
        token: action.token,
        loader: false
      };
    case authActions.LOGOUT:
      return {
        ...state,
        isLogin: false,
        token: null,
      };
    case authActions.LOGIN_ERROR:
      return {
        ...state,
        isError: true,
        message: action.message,
        loader: false
      };
    case authActions.RESET_ERROR:
      return {
        ...state,
        isError: false,
        message: ""
      };
    case authActions.AUTH_ERROR:
      return {
        ...state,
        isLogin: false,
        accessToken: null
      };
    case authActions.ADD_PROJECT_REQUEST:
      return {
        ...state,
        loader: true
      };
    case authActions.PROJECTS_DONE:
      return {
        ...state,
        posts: action.data,
      };
    case authActions.PROJECT_ADDED:
      return {
        ...state,
        loader: false,
        posts: [...state.posts ,action.data],
      };
    default:
      return state;
  }
}
