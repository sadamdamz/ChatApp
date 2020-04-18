import React, { Component } from "react";
import "./index.css";
import Signin from "./components/Signin/signin";
import Login from "./components/Login/login"
import Chat from './components/Chat/index'
import { ProtectedRoute } from './components/protectedRoute'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/chat" component={Chat} />
        </Switch>
      </Router>
    );
  }
}

export default App;
