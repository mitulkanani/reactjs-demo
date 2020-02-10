import { all, takeEvery, put, fork } from "redux-saga/effects";
import authActions from "./actions";
import { userLogin, userRegister, addProject, getProject } from "../../service/auth";
import { push } from "react-router-redux";
import { message } from "antd";

export function* loginRequest() {
  yield takeEvery(authActions.LOGIN_REQUEST, function* ({ data }) {
    try {
      let response;
      if (data.type === "register") {
        response = yield userRegister({
          email: data.email,
          password: data.password,
          name: data.name
        });
      } else {
        response = yield userLogin({
          email: data.email,
          password: data.password
        });
      }
      if (response.status === 200 || response.status === 201) {
        const { data } = response.data;
        yield put({
          type: authActions.LOGIN_SUCCESS,
          token: data.token,
          isActive: data.user.active,
          isCompleted: data.user.isCompleted,
          role: data.user.role
        });
        yield put(push("/home"));
      } else {
        throw response;
      }
    } catch (e) {
      message.error(e.response.data.message);
      yield put({
        type: authActions.LOGIN_ERROR,
        message: e.response.data.message
      });
    }
  });

  yield takeEvery(authActions.ADD_PROJECT_REQUEST, function* ({ data }) {
    try {
      console.log(data)
      const response = yield addProject(data.data, data.token);
      if (response.status === 200 || response.status === 201) {
        const { data } = response.data;
        yield put({
          type: authActions.PROJECT_ADDED,
          data: data
        });
        yield put(push("/home"));
      }
    } catch (e) {
      console.log('Error :: ', e)
      yield put({
        type: authActions.LOGIN_ERROR,
        message: e.response.data.message
      });
    }
  });

  yield takeEvery(authActions.GET_PROJECTS, function* ({ data }) {
    try {
      const response = yield getProject(data);
      if (response.status === 200 || response.status === 201) {
        const { data } = response.data;
        yield put({
          type: authActions.PROJECTS_DONE,
          data: data
        });
      }
    } catch (e) {
      message.error(e.response.data.message);
      yield put({
        type: authActions.LOGIN_ERROR,
        message: e.response.data.message
      });
    }
  });

}

export default function* authSagas() {
  yield all([fork(loginRequest)]);
}

