import React from 'react';
import { store, persistor, history } from "./redux/store";
import {Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import './assets/scss/app.scss';

import Login from './auth/LoginComponent.js'
import Register from './auth/RegisterComponent.js'
import Home from './home/HomeComponent.js'

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/login" />} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/home" component={Home} />
            </Switch>
          </PersistGate>
        </Provider>
      </Router>
    </div>
  );
}

export default App;
