import React, { Component, Fragment } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Header from "./components/layout/Header";
import Dashboard from "./components/inventory/Dashboard";
import Form from "./components/inventory/Form";
import Inventory from "./components/inventory/Inventory";
import Alerts from "./components/layout/Alerts";
import Login from "./components/accounts/Login";
import Register from "./components/accounts/Register";
import PrivateRoute from "./components/common/PrivateRoute";

import { Provider as ReduxProvider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";

import "./styles/bootstrap.min.css";

const alertOptions = {
  timeout: 3000,
  position: "top center"
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <ReduxProvider store={store}>
        <Provider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <div className="container">
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard} />
                  <PrivateRoute exact path="/inventory" component={Inventory} />
                  <PrivateRoute exact path="/form" component={Form} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </Provider>
      </ReduxProvider>
    );
  }
}

export default App;
