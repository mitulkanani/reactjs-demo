const authActions = {
  LOGIN: "LOGIN",
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGOUT: "LOGOUT",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_ERROR: "LOGIN_ERROR",
  RESET_ERROR: "RESET_ERROR",
  AUTH_ERROR: "AUTH_ERROR",
  ADD_PROJECT: "ADD_PROJECT",
  ADD_PROJECT_REQUEST: "ADD_PROJECT_REQUEST",
  GET_PROJECTS: "GET_PROJECTS",
  PROJECTS_DONE: "PROJECTS_DONE",
  PROJECT_ADDED: "PROJECT_ADDED",

  login: value => {
    return {
      type: authActions.LOGIN_REQUEST,
      data: value.data
    };
  },
  logout: () => {
    return {
      type: authActions.LOGOUT
    };
  },
  resetError: () => {
    return {
      type: authActions.AUTH_ERROR
    };
  },

  addProject: (data, token) => {
    return {
      type: authActions.ADD_PROJECT_REQUEST,
      data: {data, token}
    }
  },

  getProject: (token) => {
    return {
      type: authActions.GET_PROJECTS,
      data: token
    }
  }
};

export default authActions;
