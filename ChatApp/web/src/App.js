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
  Redirect,
} from "react-router-dom";

const token = localStorage.getItem('usertoken')

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
          {
            token ? <Redirect from="/" exact to="/chat"/>:''
          }
          <Route exact  path="/" component={Signin} />
          <Route  exact path="/login" component={Login} render={(props)=><Login {...props}/>}/>
          <ProtectedRoute  path="/chat" component={Chat} />
        </Switch>
      </Router>
    );
  }
}

export default App;
