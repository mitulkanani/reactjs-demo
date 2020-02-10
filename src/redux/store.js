import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import createReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootSaga from "./sagas";
import logger from "redux-logger";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "react-router-redux";
const history = createBrowserHistory();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"]
};
const sagaMiddleware = createSagaMiddleware();
const middlewares = [logger, sagaMiddleware, routerMiddleware(history)];
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedReducer = persistReducer(persistConfig, createReducer());

const store = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(...middlewares))
);
store.dispatch({ type: "RESET_AUTH_LOADER" });
sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor, history };
